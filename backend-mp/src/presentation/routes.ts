import { type Response, Router } from "express";
import { UserRoutes } from "./user/user.routes.js";
import { AuthRoutes } from "./auth/auth.route.js";
import { FiscaliaRoutes } from "./fiscalia/fiscalias.route.js";
import { CasesRoutes } from "./cases/cases.routes.js";
import { validateJWT } from "./middlewares/auth.middleware.js";

// biome-ignore lint/complexity/noStaticOnlyClass: Es necesaria
export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.get("/", (_, res: Response) => {
			res.json({ message: "Backend MP funcionando" });
		});

		router.use("/user", [validateJWT], UserRoutes.routes);
		router.use("/auth", AuthRoutes.routes);
		router.use("/fiscalia", [validateJWT], FiscaliaRoutes.routes);
		router.use("/case", [validateJWT], CasesRoutes.routes);

		return router;
	}
}
