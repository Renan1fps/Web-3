import { DatabaseProvider } from "./infra/database/database";

(async () => {
	console.log("Initializing Database");
	await DatabaseProvider.initialize();
	console.log("Database started successfully");

	console.log("Init server");
	import("./server");
})();