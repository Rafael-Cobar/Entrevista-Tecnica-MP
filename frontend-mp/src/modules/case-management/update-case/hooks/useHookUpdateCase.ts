import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getAxios, patchAxios } from "@/libs/axios.adapter";
import { ENDPOINTS } from "@/endpoints/endpoints";
import { getErrorAxios } from "@/utils/errorAxios";
import type {
	FiscaliaResponse,
	FiscaliasComboBox,
} from "../../create-case/interface/fiscalias.inteface";
import { updateCaseSchema } from "../validators/create-case-schema";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useStoreCase } from "@/store/zustand/case/useStoreCase";

type FormUpdateCase = {
	title: string;
	description: string;
	idFiscalia: string;
};

export default function useHookUpdateCase() {
	const [isLoading, setIsLoading] = useState(false);
	const [fiscalias, setFiscalias] = useState<FiscaliasComboBox[]>([]);
	const { idCase } = useParams();
	const navigate = useNavigate();
	const dataCase = useStoreCase((state) => state.data);

	const {
		formState: { errors },
		control,
		register,
		handleSubmit,
	} = useForm<FormUpdateCase>({
		defaultValues: {
			title: dataCase.title ?? "",
			description: dataCase.description ?? "",
			idFiscalia: dataCase.fiscalia.value ?? "",
		},
		resolver: zodResolver(updateCaseSchema),
		mode: "all",
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: necesario
	useEffect(() => {
		if (!idCase) {
			navigate(ROUTES.case_management.cases);
			return;
		}
		getFiscalias();
	}, []);

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
		if (isLoading || fiscalias.length === 0) return;
		setIsLoading(true);
		try {
			await patchAxios({
				url: `${ENDPOINTS.updateCase}/${idCase}`,
				body: data,
			});
			toast.success("Actualización realizada exitosamente");
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
	};
}
