import type { InsertCaseDTO } from "../../../domain/dtos/case/insert-case.dto.js";
import { ProcessStates } from "../../../domain/states/states.js";
import type { IGetCase } from "../../../interface/case/case.interface.js";
import { Database } from "../sqlserver-database.js";

export class CasesDB {
	public async insertNewCase(insertCaseDTO: InsertCaseDTO) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool
				.request()
				.input("titulo", insertCaseDTO.title)
				.input("descripcion", insertCaseDTO.description)
				.input("id_estado_proceso", ProcessStates.PENDING)
				.input("id_fiscalia", insertCaseDTO.idFiscalia)
				.execute("sp_InsertarCaso");

			if (!result.recordset || result.recordset.length === 0) {
				return { idCase: null };
			}
			const response = result.recordset[0];
			return { idCase: response.id_caso };
		} catch (error) {
			console.error("Error case insert", error);
			return { idCase: null };
		}
	}

	public async getDataCase(idCase: number) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool.request().input("id_caso", idCase).execute("sp_getCase");

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
				idUser: response.id_usuario,
			};
			return newCase;
		} catch (error) {
			console.error("Error obtener caso:", error);
			return null;
		}
	}

	public async assignUserToCase(idCase: number, idUser: number) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			await pool
				.request()
				.input("id_caso", idCase)
				.input("id_usuario", idUser)
				.execute("sp_ActualizarYAsignarCaso");
			return true;
		} catch (error) {
			console.error("Error assign user to case insert", error);
			return false;
		}
	}

	public async addFailLog(idCase: number, idUser: number) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			await pool
				.request()
				.input("id_caso", idCase)
				.input("id_usuario", idUser)
				.execute("sp_AgregarLogFallido");
			return true;
		} catch (error) {
			console.error("Error add fail log insert", error);
			return false;
		}
	}
}
