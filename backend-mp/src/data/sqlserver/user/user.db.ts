import type { RegisterUserDTO } from "../../../domain/dtos/user/register-user.dto.js";
import { Database } from "../sqlserver-database.js";

export class UserDB {
	public async userExists(identification: string): Promise<boolean> {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool
				.request()
				.input("no_identificacion", identification)
				.execute("sp_existeUsuario");

			if (!result.recordset || result.recordset.length === 0) {
				return false;
			}
			return Boolean(result.recordset[0].Existe);
		} catch (error) {
			console.error("Error user verify:", error);
			return false;
		}
	}

	public async insertUser(
		registerUserDTO: RegisterUserDTO,
		password: string,
	): Promise<{ success: boolean; userId?: number }> {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool
				.request()
				.input("no_identificacion", registerUserDTO.identification)
				.input("nombres", registerUserDTO.names)
				.input("apellidos", registerUserDTO.lastNames)
				.input("fecha_nac", registerUserDTO.birthDate)
				.input("correo", registerUserDTO.email)
				.input("contrasenia", password)
				.input("roles", JSON.stringify(registerUserDTO.roles))
				.execute("sp_crearUsuario");

			if (!result.recordset || result.recordset.length === 0) {
				return { success: false };
			}
			const response = result.recordset[0];
			return { success: Boolean(response.success), userId: Number(response.id_usuario) };
		} catch (error) {
			console.error("Error user insert", error);
			return { success: false };
		}
	}
}
