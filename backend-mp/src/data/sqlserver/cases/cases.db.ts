import { toGuatemalaReadable } from '../../../config/adapters/dayjs.adapter.js';
import type { ChangeCaseStateDTO } from '../../../domain/dtos/case/change-case-state.dto.js';
import type { InsertCaseDTO } from '../../../domain/dtos/case/insert-case.dto.js';
import type { UpdateCaseDTO } from '../../../domain/dtos/case/update-case.dto.js';
import { ProcessStates } from '../../../domain/states/states.js';
import type { IGetCase, NewCase } from '../../../interface/case/case.interface.js';
import { Database } from '../sqlserver-database.js';

export class CasesDB {
	public async insertNewCase(insertCaseDTO: InsertCaseDTO) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool
				.request()
				.input('titulo', insertCaseDTO.title)
				.input('descripcion', insertCaseDTO.description)
				.input('id_estado_proceso', ProcessStates.PENDING)
				.input('id_fiscalia', insertCaseDTO.idFiscalia)
				.execute('sp_InsertarCaso');

			if (!result.recordset || result.recordset.length === 0) {
				return { idCase: null };
			}
			const response = result.recordset[0];
			return { idCase: response.id_caso };
		} catch (error) {
			console.error('Error case insert', error);
			return { idCase: null };
		}
	}

	public async getDataCase(idCase: number) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool.request().input('id_caso', idCase).execute('sp_getCase');

			if (!result.recordset || result.recordset.length === 0) {
				return null;
			}
			const response = result.recordset[0];

			const newCase: IGetCase = {
				idCase: response.id_caso,
				title: response.titulo,
				description: response.descripcion,
				idState: response.id_estado,
				state: response.estado,
				idProcessState: response.id_estado_proceso,
				processState: response.proceso,
				date: response.fecha_creacion,
				idFiscalia: response.id_fiscalia,
				idAssignUser: response.id_asignacion,
				idUser: response.id_usuario
			};
			return newCase;
		} catch (error) {
			console.error('Error obtener caso:', error);
			return null;
		}
	}

	public async assignUserToCase(idCase: number, idUser: number) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			await pool.request().input('id_caso', idCase).input('id_usuario', idUser).execute('sp_ActualizarYAsignarCaso');
			return true;
		} catch (error) {
			console.error('Error assign user to case insert', error);
			return false;
		}
	}

	public async addFailLog(idCase: number, idUser: number) {
		try {
			console.log({ idCase, idUser });
			const db = Database.getInstance();
			const pool = await db.connect();
			await pool.request().input('id_caso', idCase).input('id_usuario_actual', idUser).execute('sp_AgregarLogFallido');
			return true;
		} catch (error) {
			console.error('Error add fail log insert', error);
			return false;
		}
	}

	public async getDataCases(idUser: number | null) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool.request().input('id_usuario', idUser).execute('sp_getCases');

			const response = result.recordset;

			const newCases: NewCase[] = response.map((c) => ({
				idCase: c.id_caso,
				title: c.titulo,
				description: c.descripcion,
				idState: c.id_estado,
				state: c.estado,
				idProcessState: c.id_estado_proceso,
				processState: c.proceso,
				date: c.fecha_creacion,
				idFiscalia: c.id_fiscalia,
				fiscalia: c.fiscalia,
				idUser: c.id_usuario,
				names: c.nombres,
				lastName: c.apellidos,
				identification: c.no_identificacion
			}));
			return newCases;
		} catch (error) {
			console.error('Error obtener caso:', error);
			return null;
		}
	}

	public async updateCase(dataCase: UpdateCaseDTO): Promise<boolean> {
		try {
			const { id, title, description, idFiscalia } = dataCase;
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool
				.request()
				.input('id_caso', id)
				.input('titulo', title)
				.input('descripcion', description)
				.input('id_fiscalia', idFiscalia)
				.execute('sp_ActualizarCaso');

			const updated = result.returnValue === 1;
			return updated;
		} catch (error) {
			console.error('Error updating case:', error);
			return false;
		}
	}

	public async changeCaseState(changes: ChangeCaseStateDTO): Promise<boolean> {
		const { idCase, idState, idUser } = changes;
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			await pool
				.request()
				.input('id_caso', idCase)
				.input('id_estado_proceso_actual', idState)
				.input('id_usuario_actual', idUser)
				.execute('sp_CambiarEstadoCaso');

			return true;
		} catch (error) {
			console.error('Error cambiar estado proceso del caso:', error);
			return false;
		}
	}

	public async getCaseLogs(idCase: number) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool.request().input('id_caso', idCase).execute('sp_GetCaseBitacora');

			if (!result.recordset || result.recordset.length === 0) {
				return [];
			}

			const response = result.recordset;

			const bitacora = response.map((b: any) => ({
				idBitacora: b.id_bitacora,
				date: toGuatemalaReadable(b.fecha),
				reason: b.motivo,
				typeLog: b.tipo_bitacora,
				currentProcess: b.estado_proceso_actual,
				currentUser: b.usuario_actual
			}));
			return bitacora;
		} catch (error) {
			console.error('Error obtener bitácora del caso:', error);
			return null;
		}
	}

	public async getCaseAssignments(idCase: number) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool.request().input('id_caso', idCase).execute('sp_GetCaseAssignments');

			if (!result.recordset || result.recordset.length === 0) {
				return [];
			}

			const response = result.recordset;

			const assignments = response.map((a: any) => ({
				idAssignment: a.id_asignacion,
				dateCreated: toGuatemalaReadable(a.fecha_creacion),
				dateUpdated: toGuatemalaReadable(a.fecha_actualizacion),
				user: a.usuario,
				identification: a.no_identificacion,
				state: a.estado
			}));
			return assignments;
		} catch (error) {
			console.error('Error obtener asignaciones del caso:', error);
			return null;
		}
	}
}
