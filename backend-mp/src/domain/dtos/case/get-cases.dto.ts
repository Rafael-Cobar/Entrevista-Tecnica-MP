export class GetCasesDTO {
	private constructor(public readonly idUser: number | null) {}

	// biome-ignore lint/suspicious/noExplicitAny: Es necesario el ANY
	static create(object: { [key: string]: any }): [string | null, GetCasesDTO?] {
		let { idUser } = object;

		if (!idUser) return ["Campo id Usuario es obligatorio"];

		if (idUser === "*") {
			idUser = null;
		} else {
			console.log(idUser);
			if (Number.isNaN(Number(idUser))) return ["Campo id Usuario debe ser un número"];
		}

		return [null, new GetCasesDTO(idUser)];
	}
}
