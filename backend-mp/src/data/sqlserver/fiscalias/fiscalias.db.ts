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
}
