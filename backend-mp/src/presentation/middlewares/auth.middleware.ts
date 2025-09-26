import type { NextFunction, Request, Response } from "express";
import { validateToken } from "../../config/adapters/jwt.adapter.js";
import { UserDB } from "../../data/sqlserver/user/user.db.js";

export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
	const token = req?.cookies?.token;

	if (!token) {
		res.status(401).json({ error: "token invalido" });
		return;
	}
	try {
		const payload = await validateToken<{ id: number }>(token);

		if (!payload) {
			res.status(401).json({ error: "token invalido" });
			return;
		}

		const db = new UserDB();

		const user = await db.getUser(payload.id);
		if (!user) {
			res.status(401).json({ error: "Token invalido - usuario no encontrado" }); // no es necesario dar más detalle al usuario
			return;
		}

		next();
	} catch {
		res.status(500).json({ error: "Internal server error" });
	}
};
