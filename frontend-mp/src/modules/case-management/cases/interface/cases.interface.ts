export interface Case {
	idCase: number;
	title: string;
	description: string;
	idState: number;
	state: string;
	idProcessState: number;
	processState: string;
	date: Date;
	idFiscalia: number;
	fiscalia: string;
	idUser: number | null;
	names: string | null;
	lastName: string | null;
	identification: string | null;
}
