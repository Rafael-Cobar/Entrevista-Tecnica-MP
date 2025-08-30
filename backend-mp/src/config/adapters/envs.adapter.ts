import pkg from "env-var";

const { get } = pkg;

export const envs = {
	PORT: get("PORT").required().asPortNumber(),
	DB_USER: get("DB_USER").required().asString(),
	DB_PASS: get("DB_PASS").required().asString(),
	DB_SERVER: get("DB_SERVER").required().asString(),
	DB_PORT: get("DB_PORT").required().asPortNumber(),
	DB_NAME: get("DB_NAME").required().asString(),
	DB_ENCRYPT: get("DB_ENCRYPT").required().asBool(),
	DB_TRUSTSERVERCERTIFICATE: get("DB_TRUSTSERVERCERTIFICATE").required().asBool(),
};
