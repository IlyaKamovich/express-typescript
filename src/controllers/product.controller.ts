import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IProduct } from '@interfaces/product.interface';
import { ProductService } from '@services/product.service';

class ProductController {
	private readonly productService = new ProductService();

	public findAll = async (req: Request, res: Response<{ message: IProduct[] }>, next: NextFunction) => {
		try {
			const products: IProduct[] = await this.productService.findAll();
			res.status(StatusCodes.OK).json({ message: products });
		} catch (error) {
			next(error);
		}
	};
}

export { ProductController };
