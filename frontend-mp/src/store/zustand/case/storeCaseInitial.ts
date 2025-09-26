import type { Case } from "./interface/case.interface";

export const initialDataCase: Case = {
	id: "",
	title: "",
	description: "",
	fiscalia: {
		value: "",
		label: "",
	},
	fiscal: null,
	processState: "",
	assignments: [],
	logs: [],
};
