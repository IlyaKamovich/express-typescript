import { Schema, model } from 'mongoose';
import { IProduct } from '@interfaces/product.interface';

const ProductSchema = new Schema<IProduct>({
	name: { type: String, required: true },
});

const ProductModel = model<IProduct>('Product', ProductSchema);

export { ProductModel };
