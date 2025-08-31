import type { FiscaliasDB } from "../../data/sqlserver/fiscalias/fiscalias.db.js";
import { CustomError } from "../../domain/index.js";

export class FiscaliasService {
	constructor(private fiscaliasDB: FiscaliasDB) {}

	public async fiscaliasActivas() {
		const fiscalias = await this.fiscaliasDB.getDataFiscaliasActivas();
		return fiscalias;
	}

	public async usersByFiscalias(idFiscalia: number | null) {
		const users = await this.fiscaliasDB.getUsersByFiscalia(idFiscalia, null);
		if (!users || users.length === 0)
			throw CustomError.notFound("El usuario no esta asignado a la fiscalia");
		return users;
	}
}
