export interface IRoles {
	id: number;
	rol: string;
}

export interface IUSerLogin {
	idUser: number;
	identification: string;
	names: string;
	lastNames: string;
	birthDate: string;
	email: string;
	password: string;
	roles: IRoles[];
}
