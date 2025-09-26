export class UsersByFiscalia {
	private constructor(public readonly idFiscalia: number | null) {}

	// biome-ignore lint/suspicious/noExplicitAny: Es necesario el ANY
	static create(object: { [key: string]: any }): [string | null, UsersByFiscalia?] {
		let { idUser: idFiscalia } = object;

		if (!idFiscalia) return ["Campo id Usuario es obligatorio"];

		if (idFiscalia === "*") {
			idFiscalia = null;
		} else {
			if (Number.isNaN(Number(idFiscalia))) return ["Campo id Usuario debe ser un número"];
		}

		return [null, new UsersByFiscalia(idFiscalia)];
	}
}
