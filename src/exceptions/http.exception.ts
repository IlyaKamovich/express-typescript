class HttpException extends Error {
	public status: number;
	public error: string | { message: string };

	constructor(status: number, error: string | { message: string }) {
		super(typeof error === 'string' ? error : error?.message);
		this.status = status;
		this.error = error;
	}
}

export { HttpException };
