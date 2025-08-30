import express from "express";
import morgan from "morgan";

interface Options {
	port?: number;
	routes: express.Router;
}

export class Server {
	public readonly app = express();
	private readonly port: number;
	private readonly routes: express.Router;

	constructor(options: Options) {
		const { port = 3000, routes } = options;
		this.port = port;
		this.routes = routes;
	}

	async initMiddlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(morgan("dev"));
	}

	async start() {
		// Middlewares
		this.initMiddlewares();

		// Routes
		this.app.use(this.routes);

		// Server Listen
		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}`);
		});
	}
}
