import type { Response } from "express";
import { CustomError } from "../../domain/index.js";

export const handleError = (error: unknown, res: Response, statusCode?: number) => {
	if (error instanceof CustomError) {
		res.status(error.statusCode).json({ error: error.message, data: null, message: null });
		return;
	}
	res.status(statusCode ?? 500).json({
		error: error ?? "Internal server error",
		data: null,
		message: null,
	});
};
