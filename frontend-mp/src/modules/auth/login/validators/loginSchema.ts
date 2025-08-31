import * as z from "zod";

export const loginSchema = z.object({
	identification: z
		.string({ error: "El cui debe ser una cadena de texto" })
		.trim()
		.min(1, { message: "El cui es requerido" })
		.max(50, { message: "El cui debe tener como máximo 50 caracteres" }),

	password: z
		.string({ error: "La contraseña debe ser una cadena de texto" })
		.trim()
		.min(1, { message: "La contraseña es requerida" })
		.max(50, { message: "La contraseña debe tener como máximo 50 caracteres" }),
});
