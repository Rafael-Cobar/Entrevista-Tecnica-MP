import type { InsertCaseDTO } from "../../../domain/dtos/fiscalia/insert-case.dto.js";
import { ProcessStates } from "../../../domain/states/states.js";
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
			console.error("Error user insert", error);
			return { idCase: null };
		}
	}
}
