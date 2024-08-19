import { Request, Response, NextFunction } from 'express';
import { HttpException } from 'exceptions/http.exception';

function errorMiddleware(error: HttpException, req: Request, res: Response, next: NextFunction) {
	try {
		const message = error?.message || error?.message || 'Something went wrong';
		console.error(`${[req.method]} ${req.path} >> Status Code:: ${error.status}, Error Message:: ${message}`);
		res.status(error.status).json({ message });
	} catch (error) {
		next(error);
	}
}

export { errorMiddleware };
