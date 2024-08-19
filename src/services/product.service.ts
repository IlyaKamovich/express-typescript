import { ProductModel } from '@models/product.model';
import { IProduct } from '@interfaces/product.interface';

class ProductService {
	public findAll = async (): Promise<IProduct[]> => {
		const products: IProduct[] = await ProductModel.find().lean();
		return products;
	};
}

export { ProductService };
