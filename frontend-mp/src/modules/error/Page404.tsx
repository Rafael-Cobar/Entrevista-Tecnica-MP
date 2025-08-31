import { useNavigate } from "react-router-dom";
import { MdComputer, MdError } from "react-icons/md";
import { TbError404 } from "react-icons/tb";

const Page404 = () => {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);

	return (
		<div className="min-h-dvh max-h-dvh w-full flex flex-col justify-center">
			<div className="flex items-center justify-center">
				<MdComputer className="text-[150px] text-center text-gtDark" />
				<MdError className="text-[75px] text-center text-red-600" />
			</div>
			<div className="flex items-center justify-center">
				<TbError404 className="text-[150px] text-center text-red-600" />
			</div>
			<h1 className="text-4xl font-bold text-center text-red-600">
				Página No Encontrada
			</h1>
			<div className="flex items-center justify-center mt-2">
				<button
					type="button"
					className="bg-blue-500 text-white text-lg font-semibold p-3 rounded-xl hover:cursor-pointer"
					onClick={goBack}
				>
					Regresar
				</button>
			</div>
		</div>
	);
};

export default Page404;
