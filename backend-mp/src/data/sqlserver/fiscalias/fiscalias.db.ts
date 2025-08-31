import type { IFiscalia } from "../../../interface/fiscalias/fiscalias.interface.js";
import { Database } from "../sqlserver-database.js";

export class FiscaliasDB {
	public async getDataFiscaliasActivas() {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool.request().execute("sp_getFiscaliasActivas");

			return result.recordset;
		} catch (error) {
			console.log("Error data fiscalias: ", error);
			return [];
		}
	}

	public async getFiscalia(idFiscalia: number) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool
				.request()
				.input("id_fiscalia", idFiscalia)
				.execute("sp_getFiscalia");

			if (!result.recordset || result.recordset.length === 0) {
				return null;
			}
			const response = result.recordset[0];

			const fiscalias: IFiscalia = {
				id: response.id_fiscalia,
				name: response.nombre,
				address: response.direccion,
				state: response.id_estado,
				idMunicipality: response.id_municipio,
			};
			return fiscalias;
		} catch (error) {
			console.error("Error obtener fiscalia:", error);
			return null;
		}
	}
}
