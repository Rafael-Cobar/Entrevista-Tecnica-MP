import { Router } from "express";
import { CasesDB } from "../../data/sqlserver/cases/cases.db.js";
import { CasesService } from "./cases.service.js";
import { FiscaliasDB } from "../../data/sqlserver/fiscalias/fiscalias.db.js";
import { CasesController } from "./cases.controller.js";

// biome-ignore lint/complexity/noStaticOnlyClass: E
export class CasesRoutes {
	static get routes(): Router {
		const router = Router();

		const casesDB = new CasesDB();
		const fiscaliasDB = new FiscaliasDB();
		const casesService = new CasesService(casesDB, fiscaliasDB);
		const casesController = new CasesController(casesService);

		// TODO: falta JWT
		router.post("/", casesController.insertCase);
		router.post("/assign", casesController.assignUseToCase);
		router.get("/", casesController.getCases);

		return router;
	}
}
