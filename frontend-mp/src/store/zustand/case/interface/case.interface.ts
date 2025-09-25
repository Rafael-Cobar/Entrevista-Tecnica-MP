export interface CaseStore {
	data: Case;
	setData: (data: Case) => void;
	clearData: () => void;
}

export interface Case {
	id: number | string;
	title: string;
	description: string;
	fiscalia: Fiscalia;
	fiscal?: Fiscal | null;
	processState: string;
}

export interface Fiscalia {
	value?: string;
	label?: string;
}

export interface Fiscal {
	id?: number | string | null;
	names: string | null;
	lastNames: string | null;
	identification: string | null;
}
