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

type FormLogin = {
	identification: string;
	password: string;
};

export default function useLogin() {
	const navigate = useNavigate();

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
		try {
			await postAxios<LoginResponse>({
				url: ENDPOINTS.postLogin,
				body: data,
			});
			navigate(ROUTES.home);
		} catch (error: unknown) {
			toast.error(getErrorAxios(error));
		}
	});

	return {
		errors,
		register,
		onSubmit,
	};
}
