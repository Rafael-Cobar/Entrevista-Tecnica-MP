import { type Response, Router } from "express";
import { UserRoutes } from "./user/user.routes.js";

// biome-ignore lint/complexity/noStaticOnlyClass: Es necesaria
export class AppRoutes {
	static get routes(): Router {
		const router = Router();

		router.get("/", (_, res: Response) => {
			res.json({ message: "Backend MP funcionando" });
		});

		router.use("/user", UserRoutes.routes);

		return router;
	}
}
