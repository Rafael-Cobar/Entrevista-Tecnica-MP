export class UpdateCaseDTO {
	private constructor(
		public readonly id: number,
		public readonly title: string | null,
		public readonly description: string | null,
		public readonly idFiscalia: number | null,
	) {}

	// biome-ignore lint/suspicious/noExplicitAny: Es necesario el ANY
	static create(object: { [key: string]: any }): [string | null, UpdateCaseDTO?] {
		const { id, title = null, description = null, idFiscalia = null } = object;

		if (!id) return ["Campo Id es obligatorio"];
		if (Number.isNaN(Number(id))) return ["Campo 'Id' debe ser un número"];

		if (title) {
			if (title.length > 100) return ["Campo titulo no puede ser mayor de 50 caracteres"];
		}

		if (idFiscalia) {
			if (Number.isNaN(Number(idFiscalia))) return ["Campo 'Fiscalia' debe ser un número"];
		}

		return [null, new UpdateCaseDTO(id, title, description, idFiscalia)];
	}
}
