import jwt from "jsonwebtoken";
import { envs } from "./envs.adapter.js";

const JWT_SEED = envs.JWT_SEED;

export const generateToken = (payload: any, duration: number = 2 * 60 * 60 * 60) => {
	return new Promise((resolve) => {
		jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
			if (err) return resolve(null);
			resolve(token);
		});
	});
};

export const validateToken = (token: string) => {
	return new Promise((resolve) => {
		jwt.verify(token, JWT_SEED, (err, decoded) => {
			if (err) return resolve(null);
			return resolve(decoded);
		});
	});
};
