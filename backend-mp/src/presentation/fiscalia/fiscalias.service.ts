import type { FiscaliasDB } from "../../data/sqlserver/fiscalias/fiscalias.db.js";

export class FiscaliasService {
	constructor(private fiscaliasDB: FiscaliasDB) {}

	public async fiscaliasActivas() {
		const fiscalias = await this.fiscaliasDB.getDataFiscaliasActivas();
		return fiscalias;
	}
}
