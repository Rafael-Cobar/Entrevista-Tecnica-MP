export class LoginDTO {
	private constructor(
		public readonly identification: string,
		public readonly password: string,
	) {}

	// biome-ignore lint/suspicious/noExplicitAny: Es necesario el ANY
	static create(object: { [key: string]: any }): [string | null, LoginDTO?] {
		const { identification, password } = object;

		if (!identification) return ["Campo identificación es obligatorio"];
		if (identification.length > 50)
			return ["Campo identificación no puede ser mayor de 50 caracteres"];

		if (!password) return ["Campo contraseña es obligatorio"];
		if (password.length < 6) return ["Contraseña debe ser mayor a 5 caracteres"];

		return [null, new LoginDTO(identification, password)];
	}
}
