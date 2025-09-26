import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreCase } from "@/store/zustand/case/useStoreCase";
import { ROUTES } from "@/routes/routes";
import { useStoreGlobal } from "@/store/zustand/global/useStoreGlobal";
import { toast } from "sonner";
import { getErrorAxios } from "@/utils/errorAxios";
import { getAxios } from "@/libs/axios.adapter";
import { ENDPOINTS } from "@/endpoints/endpoints";
import type {
	Assignment,
	caseResponse,
	Log,
} from "@/store/zustand/case/interface/case.interface";
import type { ColumnDef } from "@tanstack/react-table";

export default function useHookViewCase() {
	const dataCase = useStoreCase((state) => state.data);
	const setDataCase = useStoreCase((state) => state.setData);
	const addLoader = useStoreGlobal((state) => state.addLoader);
	const reduceLoader = useStoreGlobal((state) => state.reduceLoader);
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: necesario
	useEffect(() => {
		if (!dataCase.id) {
			navigate(ROUTES.case_management.cases);
			return;
		}
		getInfoCase();
	}, []);

	const getInfoCase = async () => {
		addLoader();
		try {
			const response = await getAxios<caseResponse>({
				url: `${ENDPOINTS.getCaseById}/${dataCase.id}`,
			});
			setDataCase({
				...dataCase,
				logs: response.logs,
				assignments: response.assignments,
			});
		} catch (error) {
			toast.error(getErrorAxios(error));
		} finally {
			reduceLoader();
		}
	};

	const columnsLogs: ColumnDef<Log>[] = [
		{ accessorKey: "typeLog", header: "Tipo de log" },
		{ accessorKey: "currentProcess", header: "Estado" },
		{ accessorKey: "currentUser", header: "Fiscal" },
		{ accessorKey: "date", header: "Fecha" },
	];

	const columnsAssignments: ColumnDef<Assignment>[] = [
		{ accessorKey: "identification", header: "CUI" },
		{ accessorKey: "user", header: "Fiscal" },
		{ accessorKey: "dateCreated", header: "Fecha" },
		{ accessorKey: "state", header: "Estado" },
	];

	return {
		dataCase,
		columnsLogs,
		columnsAssignments,
	};
}
