import { create } from "zustand";

interface IGlobalStore {
	isLoading: number[];
	isLoadingTable: number[];
	addLoader: () => void;
	reduceLoader: () => void;
	clearLoader: () => void;
	addLoaderTable: () => void;
	reduceLoaderTable: () => void;
	clearLoaderTable: () => void;
}

export const useStoreGlobal = create<IGlobalStore>()((set, get) => ({
	// ================================================================
	// DATA
	isLoading: [],
	isLoadingTable: [],

	// ================================================================
	// ACTIONS
	addLoader: () => {
		const currentIsLoading = get().isLoading;
		const newIsLoading = [...currentIsLoading];
		newIsLoading.push(1);
		set({ isLoading: newIsLoading });
	},
	reduceLoader: () => {
		if (get().isLoading.length <= 0) return;
		const currentIsLoading = get().isLoading;
		const newIsLoading = [...currentIsLoading];
		newIsLoading.pop();
		set({ isLoading: newIsLoading });
	},
	clearLoader: () => {
		set({ isLoading: [] });
	},
	addLoaderTable: () => {
		const currentIsLoadingTable = get().isLoadingTable;
		const newIsLoading = [...currentIsLoadingTable];
		newIsLoading.push(1);
		set({ isLoadingTable: newIsLoading });
	},
	reduceLoaderTable: () => {
		if (get().isLoadingTable.length <= 0) return;
		const currentIsLoadingTable = get().isLoadingTable;
		const newIsLoading = [...currentIsLoadingTable];
		newIsLoading.pop();
		set({ isLoadingTable: newIsLoading });
	},
	clearLoaderTable: () => {
		set({ isLoadingTable: [] });
	},
}));
