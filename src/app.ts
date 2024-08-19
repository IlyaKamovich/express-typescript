process.env['NODE_CONFIG_DIR'] = `${__dirname}/configs`;

import express, { Application } from 'express';
import config from 'config';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import { IConfig, IConfigCors, IConfigExpressUrlencoded, IConfigRateLimit } from '@interfaces/config.interface';
import { IRoute } from '@interfaces/router.interface';
import { errorMiddleware } from '@middlewares/error.middleware';
import { ProductRoute } from '@routes/product.route';
import { connectToMongoDatabase } from '@database/connect';

class App {
	private readonly app: Application;
	private readonly port: number;

	constructor() {
		this.app = express();
		this.port = Number(process.env.PORT) || config.get<IConfig>('app').port;

		this.initialize();
	}

	private async initialize() {
		await this.connectToDatabase();

		this.initializeMiddlewares();
		this.initializeRoutes([new ProductRoute()]);
		this.initializeErrorHandling();
	}

	private initializeMiddlewares() {
		this.app.use(compression());
		this.app.use(hpp());
		this.app.use(helmet());
		this.app.use(express.json());
		this.app.use(express.urlencoded(config.get<IConfigExpressUrlencoded>('app.urlencoded')));
		this.app.use(cors(config.get<IConfigCors>('app.cors')));
		this.app.use(rateLimit(config.get<IConfigRateLimit>('app.rateLimit')));
	}

	private initializeRoutes(routes: IRoute[]) {
		routes.forEach((route) => this.app.use('/', route.router));
	}

	private initializeErrorHandling() {
		this.app.use(errorMiddleware);
	}

	private async connectToDatabase() {
		await connectToMongoDatabase();
	}

	public listen() {
		this.app.listen(this.port, () => console.log(`App listening on the port ${this.port}`));
	}
}

export { App };
