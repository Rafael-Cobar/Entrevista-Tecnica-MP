import type { Request, Response } from "express";
import type { FiscaliasService } from "./fiscalias.service.js";
import { handleSuccess } from "../utils/handle-success.js";
import { handleError } from "../utils/handle-error.js";

export class FiscaliasController {
	constructor(private fiscaliasService: FiscaliasService) {}

	getActiveFiscalias = (_req: Request, res: Response) => {
		this.fiscaliasService
			.fiscaliasActivas()
			.then((fiscalias) => {
				handleSuccess({ data: fiscalias, res, statusCode: 200, message: "Fiscalias" });
			})
			.catch((error) => handleError(error, res));
	};
}
