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

		if (!identification) return ["Missing identification"];
		if (identification.length > 50) return ["The identification cannot be longer than 30"];

		if (!names) return ["Missing names"];
		if (names.length > 50) return ["The names cannot be longer than 50"];

		if (!lastNames) return ["Missing last names"];
		if (lastNames.length > 50) return ["the last names cannot be greater than 50"];

		if (!birthDate) return ["Missing birthDate"];
		if (!isAdult(birthDate)) return ["The person must be of legal"];

		if (!email) return ["Missing email"];
		if (email.length > 100) return ["the last names cannot be greater than 100"];
		if (!regexEmail().test(email)) return ["Email is not valid"];

		if (!password) return ["Missing password"];
		if (password.length < 6) return ["Password too short"];

		if (!roles) return ["Missing roles"];
		if (!Array.isArray(roles)) return ["The roles are an array"];

		return [
			null,
			new RegisterUserDTO(identification, names, lastNames, birthDate, email, password, roles),
		];
	}
}
