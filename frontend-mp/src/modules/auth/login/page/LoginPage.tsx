import InputCustom from "../../../../components/forms/InputCustom";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
	const { errors, onSubmit, register } = useLogin();
	return (
		<div className="flex h-screen w-screen">
			<div className="w-1/2 flex items-center justify-center bg-blue-900">
				<h1 className="text-4xl font-bold text-white">Ministerio Público</h1>
			</div>
			<div className="w-1/2 flex items-center justify-center bg-gray-200">
				<div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
					<h2 className="text-2xl font-semibold text-center mb-6">
						Inicio de Sesión
					</h2>
					<form className="space-y-4" onSubmit={onSubmit}>
						<InputCustom
							label="CUI"
							error={errors.identification?.message}
							register={register("identification")}
							inputProps={{ type: "text", autoFocus: true }}
						/>
						<InputCustom
							label="Contraseña"
							error={errors.password?.message}
							register={register("password")}
							inputProps={{ type: "password" }}
						/>
						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
						>
							Iniciar sesión
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
