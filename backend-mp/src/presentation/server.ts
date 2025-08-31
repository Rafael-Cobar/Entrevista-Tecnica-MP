import express from "express";
import morgan from "morgan";
import { corsMiddleware } from "../config/adapters/cors.adapter.js";
import cookieParser from "cookie-parser";

interface Options {
	port?: number;
	routes: express.Router;
	acceptedOrigins: string;
}

export class Server {
	public readonly app = express();
	private readonly port: number;
	private readonly routes: express.Router;
	private readonly acceptedOrigins: string;

	constructor(options: Options) {
		const { port = 3000, routes, acceptedOrigins } = options;
		this.port = port;
		this.routes = routes;
		this.acceptedOrigins = acceptedOrigins;
	}

	async initMiddlewares() {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(morgan("dev"));
		this.app.use(corsMiddleware(this.acceptedOrigins));
		this.app.use(cookieParser());
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
