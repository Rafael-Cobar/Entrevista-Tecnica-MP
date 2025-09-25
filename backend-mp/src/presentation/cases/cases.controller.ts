import type { Request, Response } from "express";
import { InsertCaseDTO } from "../../domain/dtos/case/insert-case.dto.js";
import { handleError } from "../utils/handle-error.js";
import type { CasesService } from "./cases.service.js";
import { handleSuccess } from "../utils/handle-success.js";
import { AssignUserToCaseDTO } from "../../domain/dtos/case/assign-user-case.dto.js";
import { GetCasesDTO } from "../../domain/dtos/case/get-cases.dto.js";
import { getCSV } from "../../config/adapters/csv.adapter.js";
import type { NewCase } from "../../interface/case/case.interface.js";
import { UpdateCaseDTO } from "../../domain/dtos/case/update-case.dto.js";
import { ChangeCaseStateDTO } from "../../domain/dtos/case/change-case-state.dto.js";
import { DataCaseDTO } from "../../domain/dtos/case/data-case.dto.js";

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

	getCases = (req: Request, res: Response) => {
		const [error, getCasesDTO] = GetCasesDTO.create(req.params);

		if (error || getCasesDTO === undefined) {
			handleError(error, res, 400);
			return;
		}

		this.caseService
			.getCases(getCasesDTO?.idUser)
			.then((cases) =>
				handleSuccess({
					data: cases,
					res,
					statusCode: 200,
					message: "Casos obtenidos",
				}),
			)
			.catch((error) => handleError(error, res));
	};

	getCasesXML = (req: Request, res: Response) => {
		const [error, getCasesDTO] = GetCasesDTO.create(req.params);

		if (error || getCasesDTO === undefined) {
			handleError(error, res, 400);
			return;
		}

		this.caseService
			.getCases(getCasesDTO?.idUser)
			.then((cases) => {
				const csv = getCSV<NewCase>({
					fields: [
						"idCase",
						"date",
						"title",
						"description",
						"fiscalia",
						"identification",
						"lastName",
						"names",
						"processState",
					],
					data: cases ?? [],
				});
				res.header("Content-Type", "text/csv");
				res.attachment("cases.csv");
				res.send(csv);
			})
			.catch((error) => handleError(error, res));
	};

	updateCase = (req: Request, res: Response) => {
		const [error, updateCaseDTO] = UpdateCaseDTO.create({ ...req.body, ...req.params });

		if (error || !updateCaseDTO) {
			handleError(error, res, 400);
			return;
		}

		this.caseService
			.updateCase(updateCaseDTO)
			.then(() => handleSuccess({ data: null, res, statusCode: 201, message: "Caso Actualizado" }))
			.catch((error) => handleError(error, res));
	};

	changeCaseProcessState = (req: Request, res: Response) => {
		const [error, changeCaseStateDTO] = ChangeCaseStateDTO.create(req.body);

		if (error || !changeCaseStateDTO) {
			handleError(error, res, 400);
			return;
		}

		this.caseService
			.changeCaseProcessState(changeCaseStateDTO)
			.then(() =>
				handleSuccess({ data: null, res, statusCode: 201, message: "Estado Actualizado" }),
			)
			.catch((error) => handleError(error, res));
	};

	dataCaseById = (req: Request, res: Response) => {
		const [error, dataCaseDTO] = DataCaseDTO.create(req.params);

		if (error || !dataCaseDTO) {
			handleError(error, res, 400);
			return;
		}

		this.caseService
			.dataCaseById(dataCaseDTO)
			.then((data) => handleSuccess({ data, res, statusCode: 200, message: "Datos del caso" }))
			.catch((error) => handleError(error, res));
	};
}
