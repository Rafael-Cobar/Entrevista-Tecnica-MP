import { bcryptAdapter } from "../../config/adapters/bcrypt.adapter.js";
import { generateToken } from "../../config/adapters/jwt.adapter.js";
import type { AuthDB } from "../../data/sqlserver/auth/auth.db.js";
import type { LoginDTO } from "../../domain/dtos/auth/login.dto.js";
import { CustomError } from "../../domain/index.js";

export class AuthService {
	constructor(private authDB: AuthDB) {}

	public async loginUser(loginDTO: LoginDTO) {
		const user = await this.authDB.getDataLoginUser(loginDTO.identification);
		if (!user.exists || !user.data) throw CustomError.notFound("Credenciales incorrectas");

		const result = bcryptAdapter.compare(loginDTO.password, user.data?.password);
		if (!result) throw CustomError.notFound("Credenciales incorrectas");

		const { password: _, ...userData } = user.data;

		const token = await generateToken({
			id: user.data.idUser,
			identification: user.data.identification,
		});
		if (!token) throw CustomError.internalServer("Error mientras se generaba el JWT");

		return { user: userData, token };
	}
}
