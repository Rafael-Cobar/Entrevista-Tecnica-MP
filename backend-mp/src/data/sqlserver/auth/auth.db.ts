import type { IUSerLogin } from "../../../interface/auth/auth.interface.js";
import { Database } from "../sqlserver-database.js";

export class AuthDB {
	public async getDataLoginUser(identification: string) {
		try {
			const db = Database.getInstance();
			const pool = await db.connect();
			const result = await pool
				.request()
				.input("no_identificacion", identification)
				.execute("sp_getUsuarioLogin");

			if (!result.recordset || result.recordset.length === 0) {
				return {
					exists: false,
					data: null,
				};
			}

			const response = result.recordset;

			const data: IUSerLogin = {
				idUser: response[0].id_usuario,
				identification,
				names: response[0].nombres,
				lastNames: response[0].apellidos,
				birthDate: response[0].fecha_nac,
				email: response[0].correo,
				password: response[0].contrasenia,
				roles: [],
			};

			data.roles = response.map((u) => ({ id: u.id_rol, rol: u.rol }));

			return {
				exists: true,
				data,
			};
		} catch (error) {
			console.error("Error login user:", error);
			return {
				exists: false,
				data: null,
			};
		}
	}
}
