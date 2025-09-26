export class DataCaseDTO {
	private constructor(public readonly idCase: number) {}

	// biome-ignore lint/suspicious/noExplicitAny: Es necesario el ANY
	static create(object: { [key: string]: any }): [string | null, DataCaseDTO?] {
		const { idCase } = object;

		if (!idCase) return ["Campo Id Caso es obligatorio"];
		if (Number.isNaN(Number(idCase))) return ["Campo 'Id Caso' debe ser un número"];

		return [null, new DataCaseDTO(idCase)];
	}
}
