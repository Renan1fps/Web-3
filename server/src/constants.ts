import "dotenv/config";

export class Constants {

	static ENV = process.env.ENV as string;
	static APP_NAME = process.env.APP_NAME as string;
	static PORT = process.env.PORT;
	static DEBUG = process.env.DEBUG === "true" ? true : false;

	static SECRET_TOKEN = process.env.SECRET_TOKEN as string;
	static SECRET_TOKEN_EXPIRATION = process.env.SECRET_TOKEN_EXPIRATION as string;

	static SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN as string;
	static SECRET_REFRESH_TOKEN_EXPIRATION = process.env.SECRET_REFRESH_TOKEN_EXPIRATION as string;

	static DB_HOST = process.env.DB_HOST as string;
	static DB_USER = process.env.DB_USER as string;
	static DB_PASSWORD = process.env.DB_PASSWORD as string;
	static DB_NAME = process.env.DB_NAME as string;
} 