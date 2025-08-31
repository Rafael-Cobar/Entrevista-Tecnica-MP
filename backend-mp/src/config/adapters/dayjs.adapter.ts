// biome-ignore assist/source/organizeImports: a
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

// Cargar los plugins
dayjs.extend(utc);
dayjs.extend(timezone);

// Establecer la zona horaria por defecto a Guatemala
dayjs.tz.setDefault("America/Guatemala");

export const dateNowGuatemala = dayjs().tz("America/Guatemala");

export const isAdult = (stringDate: string): boolean => {
	const birthDate = dayjs(stringDate);
	const now = dayjs();
	const age = now.diff(birthDate, "year");
	return age >= 18;
};
