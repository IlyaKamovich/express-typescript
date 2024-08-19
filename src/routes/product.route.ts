import { Router } from 'express';
import { ProductController } from '@controllers/product.controller';
import { IRoute } from '@interfaces/router.interface';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { CreateProductDto } from '@dtos/create-product.dto';

class ProductRoute implements IRoute {
	readonly path = '/product';
	readonly router = Router();
	readonly productController = new ProductController();

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}`, this.productController.findAll);
		this.router.post(`${this.path}`, validationMiddleware(CreateProductDto), this.productController.create);
	}
}

export { ProductRoute };
