import { envs } from "./config/envs.adapter.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";

(() => {
	main();
})();

async function main() {
	const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });
	server.start();
}
