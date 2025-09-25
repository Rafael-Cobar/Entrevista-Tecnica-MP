import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { getAxios, postAxios } from "@/libs/axios.adapter";
import { ENDPOINTS } from "@/endpoints/endpoints";
import { getErrorAxios } from "@/utils/errorAxios";
import type { UsersByFiscalia } from "../interface/users-fiscalia.interface";
import { assignUserSchema } from "../validators/assign-user-schema";
import { useNavigate, useParams } from "react-router-dom";
import { useStoreCase } from "@/store/zustand/case/useStoreCase";
import { ROUTES } from "@/routes/routes";

type FormCreateCase = {
	idUser: string;
};

interface ComboBox {
	value: string;
	label: string;
}

export default function useHookAssignUser() {
	const [isLoading, setIsLoading] = useState(false);
	const [users, setUsers] = useState<ComboBox[]>([]);
	const dataCase = useStoreCase((state) => state.data);
	const clearDataCase = useStoreCase((state) => state.clearData);
	const params = useParams();
	const navigate = useNavigate();

	const {
		formState: { errors },
		control,
		register,
		handleSubmit,
		reset,
	} = useForm<FormCreateCase>({
		defaultValues: {
			idUser: "",
		},
		resolver: zodResolver(assignUserSchema),
		mode: "all",
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: necesario
	useEffect(() => {
		if (!dataCase.id) {
			navigate(ROUTES.case_management.cases);
			return;
		}
		getUsers();
		return () => {
			clearDataCase();
		};
	}, []);

	const clearForm = () => {
		reset();
	};

	const getUsers = async () => {
		try {
			const usersRes = await getAxios<UsersByFiscalia[]>({
				url: ENDPOINTS.getUsersFiscalia,
			});
			const users = usersRes.map((u) => ({
				value: `${u.idUsuario}`,
				label: `${u.identification} - ${u.names} ${u.lastNames}`,
			}));
			setUsers(users);
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
			await postAxios({
				url: ENDPOINTS.assignUserCase,
				body: {
					idUser: data.idUser,
					idCase: params.idCase,
				},
			});
			toast.success("Asignación realizada exitosamente");
		} catch (error: unknown) {
			toast.error(getErrorAxios(error));
		} finally {
			setIsLoading(false);
		}
	});

	return {
		clearForm,
		control,
		dataCase,
		errors,
		isLoading,
		onSubmit,
		register,
		users,
	};
}
