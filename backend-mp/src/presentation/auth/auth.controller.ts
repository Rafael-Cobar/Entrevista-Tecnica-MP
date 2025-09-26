import type { Request, Response } from "express";
import { LoginDTO } from "../../domain/dtos/auth/login.dto.js";
import { handleError } from "../utils/handle-error.js";
import type { AuthService } from "./auth.service.js";
import { handleSuccess } from "../utils/handle-success.js";

export class AuthController {
	constructor(private authService: AuthService) {}

	loginService = (req: Request, res: Response) => {
		const [error, loginDTO] = LoginDTO.create(req.body);

		if (error || !loginDTO) {
			handleError(error, res, 400);
			return;
		}

		this.authService
			.loginUser(loginDTO)
			.then((user) => {
				if (process.env.NODE_ENV !== "prod") res.cookie("token", user.token, { httpOnly: true });
				else res.cookie("token", user.token, { httpOnly: true, sameSite: "none", secure: true });

				handleSuccess({ data: user, res, statusCode: 200, message: "Usuario logueado" });
			})
			.catch((error) => handleError(error, res));
	};
}
