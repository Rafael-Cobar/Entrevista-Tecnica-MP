import { useStoreAuth } from "@/store/zustand/auth/useStoreAuth";
import { useEffect, useState } from "react";
import type { Case } from "../interface/cases.interface";
import { getAxios } from "@/libs/axios.adapter";
import { ENDPOINTS } from "@/endpoints/endpoints";
import { getErrorAxios } from "@/utils/errorAxios";
import { useStoreGlobal } from "@/store/zustand/global/useStoreGlobal";
import { toast } from "sonner";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, UserRoundPen } from "lucide-react";
import { TooltipCustom } from "@/components/tooltip/TooltipCustom";
import { useStoreCase } from "@/store/zustand/case/useStoreCase";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export default function useCasesPage() {
	const roles = useStoreAuth((state) => state.user.roles);
	const idUser = useStoreAuth((state) => state.user.idUser);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [cases, setCases] = useState<Case[]>([]);
	const addLoader = useStoreGlobal((state) => state.addLoader);
	const reduceLoader = useStoreGlobal((state) => state.reduceLoader);
	const setDataCase = useStoreCase((state) => state.setData);
	const clearDataCase = useStoreCase((state) => state.clearData);
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: montar
	useEffect(() => {
		clearDataCase();
		const isAdmin = roles.find((r) => r.id === 1)?.id;
		setIsAdmin(isAdmin === 1);
		getCases(isAdmin === 1);
	}, []);

	const getCases = async (isAdmin: boolean) => {
		try {
			addLoader();
			const url = ENDPOINTS.getCases + `/${isAdmin ? "*" : idUser}`;
			const casesRes = await getAxios<Case[]>({
				url,
			});
			setCases(casesRes);
		} catch (error) {
			toast.error(getErrorAxios(error));
		} finally {
			reduceLoader();
		}
	};

	const selectCase = (data: Case) => {
		setDataCase({
			id: data.idCase,
			title: data.title,
			description: data.description,
			fiscalia: {
				value: `${data.idFiscalia}`,
				label: data.fiscalia,
			},
			processState: data.processState,
			fiscal: {
				id: data.idUser,
				lastNames: data.lastName,
				names: data.names,
				identification: data.identification,
			},
		});
	};

	const changeFiscal = (data: Case) => {
		selectCase(data);
		navigate(
			`${ROUTES.case_management.assign_user.path_navigate}/${data.idCase}`,
		);
	};

	const viewCase = (data: Case) => {
		selectCase(data);
		navigate(ROUTES.case_management.case);
	};

	const columns: ColumnDef<Case>[] = [
		{ accessorKey: "idCase", header: "Número de Caso" },
		{ accessorKey: "title", header: "Nombre" },
		{ accessorKey: "fiscalia", header: "Fiscalia" },
		{ accessorKey: "processState", header: "Estado de proceso" },
		{
			id: "actions",
			header: "Acciones",
			cell: ({ row }) => {
				const data = row.original;
				return (
					<div className="flex gap-2 justify-center">
						<TooltipCustom content={"Ver caso"}>
							<button
								type="button"
								onClick={() => viewCase(data)}
								className="text-green-600 hover:text-green-800"
							>
								<Eye size={18} />
							</button>
						</TooltipCustom>
						{isAdmin && data.idProcessState === 1 && (
							<TooltipCustom
								content={data.idUser ? "Cambiar fiscal" : "Asignar fiscal"}
							>
								<button
									type="button"
									onClick={() => changeFiscal(data)}
									className="text-blue-600 hover:text-blue-800"
								>
									<UserRoundPen size={18} />
								</button>
							</TooltipCustom>
						)}
						<button
							type="button"
							onClick={() => alert(`Editar caso ${data.idCase}`)}
							className="text-blue-600 hover:text-blue-800"
						>
							<Edit size={18} />
						</button>
					</div>
				);
			},
		},
	];

	return {
		isAdmin,
		cases,
		columns,
	};
}
