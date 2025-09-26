import { create } from "zustand";
import type { AuthStore, DataAuthStore } from "./interface/auth.interface";
import { initialDataUser } from "./storeAuthInitial";

export const useStoreAuth = create<AuthStore>()((set) => ({
	// ================================================================
	// DATA
	authenticated: false,
	user: { ...initialDataUser },

	// ================================================================
	// ACTIONS
	setData: (data: DataAuthStore) => {
		set({
			authenticated: data.authenticated,
			user: data.user,
		});
	},
	clearData: () => {
		set({
			authenticated: false,
			user: { ...initialDataUser },
		});
	},
}));
