export interface IFiscalia {
	id: number;
	name: string;
	address: string;
	state: number;
	idMunicipality: number;
}

export interface FiscaliaUser {
	idUsuario: number;
	names: string;
	lastNames: string;
	identification: string;
	idFiscaliaUsuario: number;
	idFiscalia: number;
}
