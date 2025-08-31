export class InsertCaseDTO {
	private constructor(
		public readonly title: string,
		public readonly description: string,
		public readonly idFiscalia: number,
	) {}

	// biome-ignore lint/suspicious/noExplicitAny: Es necesario el ANY
	static create(object: { [key: string]: any }): [string | null, InsertCaseDTO?] {
		const { title, description, idFiscalia } = object;

		if (!title) return ["Campo titulo es obligatorio"];
		if (title.length > 100) return ["Campo titulo no puede ser mayor de 50 caracteres"];

		if (!description) return ["Campo descripción es obligatorio"];

		if (!idFiscalia) return ["Campo Fiscalia es obligatorio"];
		if (Number.isNaN(Number(idFiscalia))) return ["Campo 'Fiscalia' debe ser un número"];

		return [null, new InsertCaseDTO(title, description, idFiscalia)];
	}
}
