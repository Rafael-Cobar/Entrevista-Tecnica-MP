import { bcryptAdapter } from "../../config/adapters/bcrypt.adapter.js";
import type { UserDB } from "../../data/sqlserver/user/user.db.js";
import type { RegisterUserDTO } from "../../domain/dtos/user/register-user.dto.js";
import { CustomError } from "../../domain/index.js";

export class UserService {
	constructor(private userDB: UserDB) {}

	public async registerUser(registerUserDTO: RegisterUserDTO) {
		const existUser = await this.userDB.userExists(registerUserDTO.identification);
		if (existUser) throw CustomError.badRequest("El número de identificación ya existe");

		const encryptedPass = bcryptAdapter.hash(registerUserDTO.password);

		const user = await this.userDB.insertUser(registerUserDTO, encryptedPass);

		if (!user.success)
			throw CustomError.internalServer("Existió un inconveniente al crear el usuario");

		return user;
	}
}
