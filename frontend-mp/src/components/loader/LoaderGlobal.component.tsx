import { useStoreGlobal } from "../../store/zustand/global/useStoreGlobal";
import "./loader.css";

const LoaderGlobal = () => {
	const isLoading = useStoreGlobal((state) => state.isLoading);

	if (isLoading.length <= 0) return null;

	return (
		<div className="loader-full-page">
			<div className="loader" />
			<h5 className="text-gt font-bold text-xl">Cargando...</h5>
		</div>
	);
};

export default LoaderGlobal;
