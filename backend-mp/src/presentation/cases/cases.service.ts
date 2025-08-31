import type { CasesDB } from "../../data/sqlserver/cases/cases.db.js";
import type { FiscaliasDB } from "../../data/sqlserver/fiscalias/fiscalias.db.js";
import type { InsertCaseDTO } from "../../domain/dtos/fiscalia/insert-case.dto.js";
import { CustomError } from "../../domain/index.js";
import { States } from "../../domain/states/states.js";

export class CasesService {
	constructor(
		private casesDB: CasesDB,
		private fiscaliasDB: FiscaliasDB,
	) {}

	public async insertCase(insertCaseDTO: InsertCaseDTO) {
		// 1. Verificar que la fiscalia este activa
		const fiscalia = await this.fiscaliasDB.getFiscalia(insertCaseDTO.idFiscalia);
		if (!fiscalia) throw CustomError.badRequest("No existe la fiscalia");
		if (fiscalia.state !== States.ACTIVE)
			throw CustomError.badRequest("La fiscalia no esta activa");

		// 2. Insert Case
		const newCase = await this.casesDB.insertNewCase(insertCaseDTO);
		if (!newCase.idCase || newCase.idCase <= 0)
			throw CustomError.internalServer("Existió un inconveniente al crear el caso");

		return newCase;
	}
}
