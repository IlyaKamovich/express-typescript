import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const validationMiddleware = <T extends object>(type: ClassConstructor<T>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const input = plainToInstance(type, req.body);

		try {
			const errors: ValidationError[] = await validate(input);

			if (errors.length > 0) {
				const message = errors.map((error) => Object.values(error?.constraints || '')).flat();
				res.status(StatusCodes.BAD_REQUEST).json({ error: message[0] });
				return;
			}

			next();
		} catch {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
		}
	};
};

export { validationMiddleware };
