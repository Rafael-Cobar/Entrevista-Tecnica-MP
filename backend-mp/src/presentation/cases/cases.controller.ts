import type { Request, Response } from "express";
import { InsertCaseDTO } from "../../domain/dtos/case/insert-case.dto.js";
import { handleError } from "../utils/handle-error.js";
import type { CasesService } from "./cases.service.js";
import { handleSuccess } from "../utils/handle-success.js";
import { AssignUserToCaseDTO } from "../../domain/dtos/case/assign-user-case.dto.js";

export class CasesController {
	constructor(private readonly caseService: CasesService) {}

	insertCase = (req: Request, res: Response) => {
		const [error, insertCaseDTO] = InsertCaseDTO.create(req.body);

		if (error || !insertCaseDTO) {
			handleError(error, res, 400);
			return;
		}

		this.caseService
			.insertCase(insertCaseDTO)
			.then((newCase) =>
				handleSuccess({ data: newCase, res, statusCode: 201, message: "Caso Creado" }),
			)
			.catch((error) => handleError(error, res));
	};

	assignUseToCase = (req: Request, res: Response) => {
		const [error, assignUserToCaseDTO] = AssignUserToCaseDTO.create(req.body);

		if (error || !assignUserToCaseDTO) {
			handleError(error, res, 400);
			return;
		}

		this.caseService
			.assignUserToCase(assignUserToCaseDTO)
			.then(() =>
				handleSuccess({
					data: null,
					res,
					statusCode: 201,
					message: "Asignación realizada correctamente",
				}),
			)
			.catch((error) => handleError(error, res));
	};
}
