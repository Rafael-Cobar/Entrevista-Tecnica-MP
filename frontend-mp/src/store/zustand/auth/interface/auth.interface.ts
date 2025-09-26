import type { User } from "../../../../modules/auth/login/interface/login.interface";

export interface AuthStore {
	user: User;
	authenticated: boolean;
	setData: (data: DataAuthStore) => void;
	clearData: () => void;
}

export interface DataAuthStore {
	user: User;
	authenticated: boolean;
}
