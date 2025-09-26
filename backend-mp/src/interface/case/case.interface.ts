export interface IGetCase {
	idCase: number;
	title: string;
	description: string;
	idState: number;
	state: string;
	idProcessState: number;
	processState: string;
	date: string;
	idFiscalia: number;
	idAssignUser: number | null;
	idUser: number | null;
}

export interface NewCase {
	idCase: number;
	title: string;
	description: string;
	idState: number;
	state: string;
	idProcessState: number;
	processState: string;
	date: string;
	idFiscalia: number;
	fiscalia: string;
	idUser: number;
	names: string;
	lastName: string;
	identification: string;
}
