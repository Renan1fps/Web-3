import { DataSource } from "typeorm";
import * as path from "path";
import { Constants } from "../../constants";


export const DatabaseProvider = new DataSource({
	type: "postgres",
	port: 5432,
	maxQueryExecutionTime: 5000,
	uuidExtension: "uuid-ossp",

	host: Constants.DB_HOST,
	username: Constants.DB_USER,
	password: Constants.DB_PASSWORD,
	database: Constants.DB_NAME,

	migrationsRun: true,
	ssl: true,
	extra: {
		poll: {
			max: 20,
			min: 5,
			acquire: 10000,
			idle: 20000,
		},
		ssl: false,
	},
	migrationsTransactionMode: "none",
	synchronize: false,
	logging: false,
	migrations: [`${path.join(__dirname, "migrations/*{.ts,.js}")}`],
	entities: [`${path.join(__dirname, "entities/*{.ts,.js}")}`],
});
