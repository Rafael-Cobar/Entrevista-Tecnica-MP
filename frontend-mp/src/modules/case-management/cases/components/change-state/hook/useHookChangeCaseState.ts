import { useState } from "react";
import type { Case } from "../../../interface/cases.interface";
import { useStoreCase } from "@/store/zustand/case/useStoreCase";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getErrorAxios } from "@/utils/errorAxios";
import ChangeCaseState from "../ChangeCaseState";
import { patchAxios } from "@/libs/axios.adapter";
import { ENDPOINTS } from "@/endpoints/endpoints";
import { useStoreAuth } from "@/store/zustand/auth/useStoreAuth";

type FormChangeState = {
	state: string;
};

interface states {
	value: string;
	label: string;
}

export type PropsChangeCaseState = {
	data: Case;
	onClose: () => void;
};

const catalogStates: states[] = [
	{
		value: "1",
		label: "Pendiente",
	},
	{
		value: "2",
		label: "En Proceso",
	},
	{ value: "3", label: "Completado" },
];

export function useHookChangeCaseState({
	data,
	onClose,
}: PropsChangeCaseState) {
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const idUser = useStoreAuth((state) => state.user.idUser);
	const {
		formState: { errors },
		control,
		handleSubmit,
	} = useForm<FormChangeState>({
		defaultValues: {
			state: `${data.idProcessState ?? ""}`,
		},
		mode: "all",
	});

	const open = () => {
		setIsModalOpen(true);
	};

	const close = () => {
		onClose();
	};

	const onSubmit = handleSubmit(async (dataBody) => {
		if (isLoading) return;
		setIsLoading(true);
		try {
			await patchAxios({
				url: ENDPOINTS.changeCaseState,
				body: {
					idCase: data.idCase,
					idState: dataBody.state,
					idUser,
				},
			});
			toast.success("Estado actualizado correctamente");
		} catch (error: unknown) {
			toast.error(getErrorAxios(error));
		} finally {
			setIsLoading(false);
		}
	});

	return {
		catalogStates,
		close,
		control,
		errors,
		isLoading,
		isModalOpen,
		onSubmit,
		open,
		setIsModalOpen,
	};
}
