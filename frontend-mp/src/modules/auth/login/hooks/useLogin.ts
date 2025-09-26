import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ENDPOINTS } from "../../../../endpoints/endpoints";
import { postAxios } from "../../../../libs/axios.adapter";
import { ROUTES } from "../../../../routes/routes";
import { getErrorAxios } from "../../../../utils/errorAxios";
import type { LoginResponse } from "../interface/login.interface";
import { loginSchema } from "../validators/loginSchema";
import { useStoreAuth } from "../../../../store/zustand/auth/useStoreAuth";
import { useState } from "react";

type FormLogin = {
	identification: string;
	password: string;
};

export default function useLogin() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const setData = useStoreAuth.getState().setData;

	const {
		formState: { errors },
		register,
		handleSubmit,
	} = useForm<FormLogin>({
		defaultValues: {
			identification: "",
			password: "",
		},
		resolver: zodResolver(loginSchema),
		mode: "all",
	});

	const onSubmit = handleSubmit(async (data) => {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const loginRes = await postAxios<LoginResponse>({
				url: ENDPOINTS.postLogin,
				body: data,
			});
			setData({ authenticated: true, user: loginRes.user });
			navigate(ROUTES.home);
		} catch (error: unknown) {
			toast.error(getErrorAxios(error));
		} finally {
			setIsLoading(false);
		}
	});

	return {
		errors,
		isLoading,
		register,
		onSubmit,
	};
}
