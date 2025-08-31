import type { FiscaliaUser, IFiscalia } from "../../../interface/fiscalias/fiscalias.interface.js";
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

	public async getUsersByFiscalia(idFiscalia: number | null, idUsuario: number | null) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool
				.request()
				.input("id_fiscalia", idFiscalia)
				.input("id_usuario", idUsuario)
				.execute("sp_UsuariosPorFiscalia");

			const response = result.recordset;

			const users: FiscaliaUser[] = response.map((f) => ({
				idUsuario: f.id_usuario,
				names: f.nombres,
				lastNames: f.apellidos,
				identification: f.no_identificacion,
				idFiscaliaUsuario: f.id_fiscalia_usuario,
				idFiscalia: f.id_fiscalia,
			}));
			return users;
		} catch (error) {
			console.error("Error obtener fiscalia:", error);
			return null;
		}
	}
}
