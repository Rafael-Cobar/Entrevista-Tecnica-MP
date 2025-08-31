export interface LoginResponse {
	user: User;
	token: string;
}

export interface User {
	idUser: number;
	identification: string;
	names: string;
	lastNames: string;
	birthDate: Date;
	email: string;
	roles: Role[];
}

export interface Role {
	id: number;
	rol: string;
}
