import { create } from "zustand";
import type { Case, CaseStore } from "./interface/case.interface";
import { initialDataCase } from "./storeCaseInitial";

export const useStoreCase = create<CaseStore>()((set) => ({
	// ================================================================
	// DATA
	data: initialDataCase,

	// ================================================================
	// ACTIONS
	setData: (data: Case) => {
		set({
			data,
		});
	},
	clearData: () => {
		set({
			data: { ...initialDataCase },
		});
	},
}));
