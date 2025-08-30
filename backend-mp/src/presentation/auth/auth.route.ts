import { Router } from "express";

// biome-ignore lint/complexity/noStaticOnlyClass: Es necesario
export class AuthRoutes {
	static get routes(): Router {
		const router = Router();

		router.post("/login");

		return router;
	}
}
