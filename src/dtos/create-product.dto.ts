import { IsNotEmpty, IsString, MinLength } from 'class-validator';

class CreateProductDto {
	@MinLength(5, { message: 'Минимальная длина имени продукта 5 символов' })
	@IsString({ message: 'Название продуктра должно быть строкой' })
	@IsNotEmpty({ message: 'Имя продукта не может быть пустым' })
	readonly name: string;
}

export { CreateProductDto };
