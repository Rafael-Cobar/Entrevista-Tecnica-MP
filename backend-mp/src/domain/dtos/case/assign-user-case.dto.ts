export class AssignUserToCaseDTO {
	private constructor(
		public readonly idCase: number,
		public readonly idUser: number,
	) {}

	// biome-ignore lint/suspicious/noExplicitAny: Es necesario el ANY
	static create(object: { [key: string]: any }): [string | null, AssignUserToCaseDTO?] {
		const { idCase, idUser } = object;

		if (!idCase) return ["Campo Id Caso es obligatorio"];
		if (Number.isNaN(Number(idCase))) return ["Campo id Caso debe ser un número"];

		if (!idUser) return ["Campo Id Usuario es obligatorio"];
		if (Number.isNaN(Number(idUser))) return ["Campo Id Usuario debe ser un número"];

		return [null, new AssignUserToCaseDTO(idCase, idUser)];
	}
}
