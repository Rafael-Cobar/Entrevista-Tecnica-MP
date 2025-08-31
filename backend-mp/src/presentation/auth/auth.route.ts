import { Router } from "express";
import { AuthService } from "./auth.service.js";
import { AuthDB } from "../../data/sqlserver/auth/auth.db.js";
import { AuthController } from "./auth.controller.js";

// biome-ignore lint/complexity/noStaticOnlyClass: Es necesario
export class AuthRoutes {
	static get routes(): Router {
		const router = Router();

		const authDB = new AuthDB();
		const authService = new AuthService(authDB);
		const authController = new AuthController(authService);

		router.post("/login", authController.loginService);

		return router;
	}
}
