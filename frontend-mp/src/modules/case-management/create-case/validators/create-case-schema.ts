import * as z from "zod";

export const createCaseSchema = z.object({
	title: z
		.string({ error: "El nombre debe ser una cadena de texto" })
		.trim()
		.min(1, { message: "El nombre es requerido" })
		.max(100, { message: "El nombre debe tener como máximo 50 caracteres" }),

	description: z
		.string({ error: "La descripción debe ser una cadena de texto" })
		.trim()
		.min(1, { message: "La descripción es requerida" }),

	idFiscalia: z
		.string({ error: "La fiscalia debe ser una cadena de texto" })
		.trim()
		.min(1, { message: "La fiscalia es requerida" }),
});
