import { ProductModel } from '@models/product.model';
import { IProduct } from '@interfaces/product.interface';
import { CreateProductDto } from '@dtos/create-product.dto';

class ProductService {
	public findAll = async (): Promise<IProduct[]> => {
		const products: IProduct[] = await ProductModel.find().lean();
		return products;
	};

	public create = async (productDto: CreateProductDto): Promise<IProduct> => {
		const createdProduct: IProduct = await ProductModel.create({ ...productDto });
		return createdProduct;
	};
}

export { ProductService };
