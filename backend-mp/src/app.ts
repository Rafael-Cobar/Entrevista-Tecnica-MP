import { envs } from "./config/index.js";
import { Database } from "./data/sqlserver/sqlserver-database.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";

(() => {
	main();
})();

async function main() {
	try {
		const db = Database.getInstance();
		await db.connect();

		process.on("SIGINT", async () => {
			await db.close();
			process.exit(0);
		});

		const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });
		server.start();
	} catch (error) {
		console.log("error starting server", error);
		process.exit(1);
	}
}
