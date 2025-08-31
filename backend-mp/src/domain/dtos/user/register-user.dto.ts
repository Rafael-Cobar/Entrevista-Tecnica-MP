import { isAdult } from "../../../config/adapters/dayjs.adapter.js";
import { regexEmail } from "../../../config/validators/validator.js";

export class RegisterUserDTO {
	private constructor(
		public readonly identification: string,
		public readonly names: string,
		public readonly lastNames: string,
		public readonly birthDate: string,
		public readonly email: string,
		public readonly password: string,
		public readonly roles: string[],
	) {}

	// biome-ignore lint/suspicious/noExplicitAny: Es necesario el ANY
	static create(object: { [key: string]: any }): [string | null, RegisterUserDTO?] {
		const { identification, names, lastNames, birthDate, email, password, roles } = object;

		if (!identification) return ["Campo identificación es obligatorio"];
		if (identification.length > 50)
			return ["Campo identificación no puede ser mayor de 50 caracteres"];

		if (!names) return ["Campo nombres es obligatorio"];
		if (names.length > 50) return ["Campo nombre no puede ser mayor de 50 caracteres"];

		if (!lastNames) return ["Campo apellidos es obligatorio"];
		if (lastNames.length > 50) return ["Campo apellidos no puede ser mayor de 50 caracteres"];

		if (!birthDate) return ["Campo fecha de nacimiento es obligatorio"];
		if (!isAdult(birthDate)) return ["La fecha de nacimiento debe ser mayor o igual a 18 años"];

		if (!email) return ["Campo correo es obligatorio"];
		if (email.length > 100) return ["Campo correo no puede ser mayor de 100 caracteres"];
		if (!regexEmail().test(email)) return ["Campo inválido"];

		if (!password) return ["Campo contraseña es obligatorio"];
		if (password.length < 6) return ["Contraseña debe ser mayor a 5 caracteres"];

		if (!roles) return ["Campo roles es obligatorio"];
		if (!Array.isArray(roles)) return ["Los roles son un arreglo"];
		if (roles.length === 0) return ["Debe existir un rol"];

		return [
			null,
			new RegisterUserDTO(identification, names, lastNames, birthDate, email, password, roles),
		];
	}
}
