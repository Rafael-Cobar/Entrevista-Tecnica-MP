import type { Request, Response } from "express";
import { RegisterUserDTO } from "../../domain/dtos/user/register-user.dto.js";
import { handleError } from "../utils/handle-error.js";
import { handleSuccess } from "../utils/handle-success.js";
import type { UserService } from "./user.service.js";

export class UserController {
	constructor(private readonly userService: UserService) {}

	registerUser = (req: Request, res: Response) => {
		const [error, registerUserDTO] = RegisterUserDTO.create(req.body);

		if (error || !registerUserDTO) {
			handleError(error, res, 400);
			return;
		}

		this.userService
			.registerUser(registerUserDTO)
			.then((user) =>
				handleSuccess({ data: user, res, statusCode: 201, message: "Usuario Creado" }),
			)
			.catch((error) => handleError(error, res));
	};
}
