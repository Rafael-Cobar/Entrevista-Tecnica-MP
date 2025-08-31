import { type Response, Router } from "express";
import { UserRoutes } from "./user/user.routes.js";
import { AuthRoutes } from "./auth/auth.route.js";
import { FiscaliaRoutes } from "./fiscalia/auth.route.js";
import { CasesRoutes } from "./cases/cases.routes.js";

// biome-ignore lint/complexity/noStaticOnlyClass: Es necesaria
export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.get("/", (_, res: Response) => {
			res.json({ message: "Backend MP funcionando" });
		});

		router.use("/user", UserRoutes.routes);
		router.use("/auth", AuthRoutes.routes);
		router.use("/fiscalia", FiscaliaRoutes.routes);
		router.use("/case", CasesRoutes.routes);

		return router;
	}
}
