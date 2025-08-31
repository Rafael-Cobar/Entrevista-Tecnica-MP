import { Router } from "express";
import { FiscaliasDB } from "../../data/sqlserver/fiscalias/fiscalias.db.js";
import { FiscaliasService } from "./fiscalias.service.js";
import { FiscaliasController } from "./fiscalias.controller.js";

// biome-ignore lint/complexity/noStaticOnlyClass: Es necesario
export class FiscaliaRoutes {
	static get routes(): Router {
		const router = Router();

		const fiscaliasDB = new FiscaliasDB();
		const fiscaliasService = new FiscaliasService(fiscaliasDB);
		const fiscaliasController = new FiscaliasController(fiscaliasService);

		// TODO: middleware
		router.get("/", fiscaliasController.getActiveFiscalias);
		router.get("/:idUser", fiscaliasController.getUsuarioByFiscalias);

		return router;
	}
}
