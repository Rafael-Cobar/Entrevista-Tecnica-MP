import { Parser } from "json2csv";

interface CSVOptions<T> {
	fields: (keyof T)[];
	data: T[];
}

export const getCSV = <T>({ fields, data }: CSVOptions<T>): string => {
	const opts = { fields: fields.map((f) => f.toString()) };
	const parser = new Parser<T>(opts);
	return parser.parse(data);
};
