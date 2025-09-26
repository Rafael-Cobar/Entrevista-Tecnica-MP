import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getAxios, postAxios } from "@/libs/axios.adapter";
import { ENDPOINTS } from "@/endpoints/endpoints";
import type { FiscaliaResponse } from "../interface/fiscalias.inteface";
import { getErrorAxios } from "@/utils/errorAxios";
import type { FiscaliasComboBox } from "../interface/fiscalias.inteface";
import { createCaseSchema } from "../validators/create-case-schema";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useStoreCase } from "@/store/zustand/case/useStoreCase";

type FormCreateCase = {
	title: string;
	description: string;
	idFiscalia: string;
};

interface CreateResponse {
	idCase: number;
}

export default function useHookCreateCase() {
	const [isLoading, setIsLoading] = useState(false);
	const [fiscalias, setFiscalias] = useState<FiscaliasComboBox[]>([]);
	const navigate = useNavigate();
	const setData = useStoreCase((state) => state.setData);
	const clearDataCase = useStoreCase((state) => state.clearData);

	const {
		formState: { errors },
		control,
		register,
		handleSubmit,
		reset,
	} = useForm<FormCreateCase>({
		defaultValues: {
			title: "",
			description: "",
			idFiscalia: "",
		},
		resolver: zodResolver(createCaseSchema),
		mode: "all",
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: necesario
	useEffect(() => {
		clearDataCase();
		getFiscalias();
	}, []);

	const clearForm = () => {
		reset();
	};

	const getFiscalias = async () => {
		try {
			const fiscaliasRes = await getAxios<FiscaliaResponse[]>({
				url: ENDPOINTS.getFiscalias,
			});
			const fiscalias = fiscaliasRes.map((f) => ({
				value: `${f.id}`,
				label: `${f.nombre}, ${f.municipio}, ${f.departamento}`,
			}));
			setFiscalias(fiscalias);
		} catch (error) {
			toast.error(getErrorAxios(error));
		} finally {
			setIsLoading(false);
		}
	};

	const onSubmit = handleSubmit(async (data) => {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const dataResponse = await postAxios<CreateResponse>({
				url: ENDPOINTS.postCase,
				body: data,
			});
			const fiscalia = fiscalias.find((f) => f.value === data.idFiscalia);
			toast.success("Caso Creado");
			clearForm();

			setData({
				id: dataResponse.idCase,
				title: data.title,
				description: data.description,
				fiscalia: {
					value: fiscalia?.value,
					label: fiscalia?.label,
				},
				processState: "Pendiente",
			});
			navigate(
				`${ROUTES.case_management.assign_user.path_navigate}/${dataResponse.idCase}`,
			);
		} catch (error: unknown) {
			toast.error(getErrorAxios(error));
		} finally {
			setIsLoading(false);
		}
	});

	return {
		control,
		errors,
		isLoading,
		fiscalias,
		register,
		onSubmit,
		clearForm,
	};
}
