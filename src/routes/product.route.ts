import { Router } from 'express';
import { ProductController } from '@controllers/product.controller';
import { IRoute } from '@interfaces/router.interface';

class ProductRoute implements IRoute {
	readonly path = '/product';
	readonly router = Router();
	readonly productController = new ProductController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.productController.findAll);
	}
}

export { ProductRoute };
