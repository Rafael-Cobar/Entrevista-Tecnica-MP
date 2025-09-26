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
	assignments?: Assignment[];
	logs?: Log[];
}

export interface caseResponse {
	assignments: Assignment[];
	logs: Log[];
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

export interface Assignment {
	idAssignment: number;
	dateCreated: Date;
	dateUpdated: null;
	user: string;
	identification: string;
	state: string;
}

export interface Log {
	idBitacora: number;
	date: Date;
	reason: null;
	typeLog: string;
	currentProcess: string;
	currentUser: string;
}
