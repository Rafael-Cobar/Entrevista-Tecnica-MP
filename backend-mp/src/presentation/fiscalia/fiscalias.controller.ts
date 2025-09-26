import type { Request, Response } from "express";
import type { FiscaliasService } from "./fiscalias.service.js";
import { handleSuccess } from "../utils/handle-success.js";
import { handleError } from "../utils/handle-error.js";
import { UsersByFiscalia } from "../../domain/dtos/user/user_fiscal.dto.js";

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

	getUsuarioByFiscalias = (req: Request, res: Response) => {
		const [error, usersByFiscalia] = UsersByFiscalia.create(req.params);

		if (error || usersByFiscalia === undefined) {
			handleError(error, res, 400);
			return;
		}

		this.fiscaliasService
			.usersByFiscalias(usersByFiscalia?.idFiscalia)
			.then((users) =>
				handleSuccess({
					data: users,
					res,
					statusCode: 200,
					message: "Usuarios obtenidos",
				}),
			)
			.catch((error) => handleError(error, res));
	};
}
