import * as z from "zod";

export const assignUserSchema = z.object({
	idUser: z
		.string({ error: "El usuario debe ser una cadena de texto" })
		.trim()
		.min(1, { message: "El usuario es requerida" }),
});
