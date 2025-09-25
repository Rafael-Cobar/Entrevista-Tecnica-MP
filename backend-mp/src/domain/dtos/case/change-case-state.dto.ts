export class ChangeCaseStateDTO {
	private constructor(
		public readonly idCase: number,
		public readonly idState: number,
		public readonly idUser: number,
	) {}

	// biome-ignore lint/suspicious/noExplicitAny: Es necesario el ANY
	static create(object: { [key: string]: any }): [string | null, ChangeCaseStateDTO?] {
		const { idCase, idState, idUser } = object;

		if (!idCase) return ["Campo Id Caso es obligatorio"];
		if (Number.isNaN(Number(idCase))) return ["Campo 'Id Caso' debe ser un número"];

		if (!idState) return ["Campo Id Estado es obligatorio"];
		if (Number.isNaN(Number(idState))) return ["Campo 'Id Estado' debe ser un número"];

		if (!idUser) return ["Campo Id Fiscal es obligatorio"];
		if (Number.isNaN(Number(idUser))) return ["Campo 'Id Fiscal' debe ser un número"];

		return [null, new ChangeCaseStateDTO(idCase, idState, idUser)];
	}
}
