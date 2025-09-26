import type { CasesDB } from '../../data/sqlserver/cases/cases.db.js';
import type { FiscaliasDB } from '../../data/sqlserver/fiscalias/fiscalias.db.js';
import type { AssignUserToCaseDTO } from '../../domain/dtos/case/assign-user-case.dto.js';
import type { ChangeCaseStateDTO } from '../../domain/dtos/case/change-case-state.dto.js';
import type { DataCaseDTO } from '../../domain/dtos/case/data-case.dto.js';
import type { InsertCaseDTO } from '../../domain/dtos/case/insert-case.dto.js';
import type { UpdateCaseDTO } from '../../domain/dtos/case/update-case.dto.js';
import { CustomError } from '../../domain/index.js';
import { ProcessStates, States } from '../../domain/states/states.js';

export class CasesService {
	constructor(private casesDB: CasesDB, private fiscaliasDB: FiscaliasDB) {}

	public async insertCase(insertCaseDTO: InsertCaseDTO) {
		// 1. Verificar que la fiscalia este activa
		const fiscalia = await this.fiscaliasDB.getFiscalia(insertCaseDTO.idFiscalia);
		if (!fiscalia) throw CustomError.badRequest('No existe la fiscalia');
		if (fiscalia.state !== States.ACTIVE) throw CustomError.badRequest('La fiscalia no esta activa');

		// 2. Insert Case
		const newCase = await this.casesDB.insertNewCase(insertCaseDTO);
		if (!newCase.idCase || newCase.idCase <= 0)
			throw CustomError.internalServer('Existió un inconveniente al crear el caso');

		return newCase;
	}

	public async assignUserToCase(assign: AssignUserToCaseDTO) {
		// 1. Verificar que el caso exista y este activo
		const dataCase = await this.casesDB.getDataCase(assign.idCase);
		if (!dataCase) throw CustomError.notFound('No existe el caso');

		// Verificar que el caso este activo
		if (dataCase.idState !== States.ACTIVE) throw CustomError.badRequest('El caso no se encuentra activo');

		if (dataCase.idProcessState !== ProcessStates.PENDING)
			throw CustomError.badRequest('El caso no se puede reasignar porque no esta en estado PENDIENTE');

		if (dataCase.idUser === assign.idUser)
			throw CustomError.badRequest('No se puede volver a registrar al mismo usuario');

		// 2. Obtener datos de la fiscalia del usuario
		const dataUser = await this.fiscaliasDB.getUsersByFiscalia(null, assign.idUser);
		if (!dataUser || dataUser.length === 0) {
			await this.casesDB.addFailLog(assign.idCase, assign.idUser);
			throw CustomError.notFound('El usuario no esta asignado a la fiscalia');
		}

		// 3. Verificar que el usuario y la fiscalia coinciden
		const result = dataUser.find((f) => f.idFiscalia === dataCase.idFiscalia);
		if (!result) {
			await this.casesDB.addFailLog(assign.idCase, assign.idUser);
			throw CustomError.badRequest('El usuario y la fiscalia no coinciden');
		}

		// Crear registro
		const resultAssign = await this.casesDB.assignUserToCase(assign.idCase, assign.idUser);
		if (!resultAssign) throw CustomError.internalServer('Existió un problema al asignar el usuario');
	}

	public async getCases(idUser: number | null) {
		return await this.casesDB.getDataCases(idUser);
	}

	public async updateCase(dataBody: UpdateCaseDTO) {
		// 1. Verificar que el caso exista y este activo
		const dataCase = await this.casesDB.getDataCase(dataBody.id);
		if (!dataCase) throw CustomError.notFound('No existe el caso');

		// Verificar que el caso este activo
		if (dataCase.idState !== States.ACTIVE) throw CustomError.badRequest('El caso no se encuentra activo');

		if (dataCase.idProcessState !== ProcessStates.PENDING)
			throw CustomError.badRequest('El caso no se puede reasignar porque no esta en estado PENDIENTE');

		if (dataCase.idFiscalia === dataBody.idFiscalia)
			throw CustomError.badRequest('No se puede volver a registrar la misma fiscalia');

		if (dataCase.idUser)
			throw CustomError.badRequest('No se puede cambiar de fiscalia porque el usuario ya tiene asignado un usuario');

		// Actualizar registro
		const result = await this.casesDB.updateCase(dataBody);
		if (!result) throw CustomError.internalServer('Existió un problema al actualizar la información');
	}

	public async changeCaseProcessState(dataBody: ChangeCaseStateDTO) {
		// 1. Verificar que el caso exista y este activo
		const dataCase = await this.casesDB.getDataCase(dataBody.idCase);
		if (!dataCase) throw CustomError.notFound('No existe el caso');

		// Verificar que el caso este activo
		if (dataCase.idState !== States.ACTIVE) throw CustomError.badRequest('El caso no se encuentra activo');

		if (dataCase.idProcessState === ProcessStates.COMPLETED)
			throw CustomError.badRequest('El caso no se puede cambiar el estado porque ya fue completado');

		if (dataCase.idProcessState === ProcessStates.PENDING && dataBody.idState !== ProcessStates.INPROCESS)
			throw CustomError.badRequest('El caso solo puede pasar de PENDIENTE a EN PROGRESO');

		if (dataCase.idProcessState === ProcessStates.INPROCESS && dataBody.idState !== ProcessStates.COMPLETED)
			throw CustomError.badRequest('El caso solo puede pasar de EN PROGRESO a COMPLETADO');

		// Actualizar registro
		const result = await this.casesDB.changeCaseState(dataBody);
		if (!result) throw CustomError.internalServer('Existió un problema al actualizar el estado del proceso del caso');
	}

	public async dataCaseById(dataBody: DataCaseDTO) {
		// 1. Verificar que el caso exista y este activo
		const dataCase = await this.casesDB.getDataCase(dataBody.idCase);
		if (!dataCase) throw CustomError.notFound('No existe el caso');

		// Verificar que el caso este activo
		if (dataCase.idState !== States.ACTIVE) throw CustomError.badRequest('El caso no se encuentra activo');

		const [logs, assignments] = await Promise.all([
			this.casesDB.getCaseLogs(dataBody.idCase),
			this.casesDB.getCaseAssignments(dataBody.idCase)
		]);

		return {
			case: dataCase,
			logs,
			assignments
		};
	}
}
