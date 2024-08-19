import { DraftHeadersVersion, ValueDeterminingMiddleware } from 'express-rate-limit';

export interface IConfig {
	port: number;
	database: string;
	urlencoded: IConfigExpressUrlencoded;
	cors: IConfigCors;
	rateLimit: IConfigRateLimit;
}

export interface IConfigExpressUrlencoded {
	extended: boolean;
	parameterLimit: number;
}

export interface IConfigCors {
	origin: string;
	credentials: boolean;
}

export interface IConfigRateLimit {
	windowMs?: number | undefined;
	limit?: number | ValueDeterminingMiddleware<number> | undefined;
	standardHeaders?: boolean | DraftHeadersVersion | undefined;
	legacyHeaders?: boolean | undefined;
	message: {
		error: string;
	};
}
