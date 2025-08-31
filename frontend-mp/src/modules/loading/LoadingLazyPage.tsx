import LoaderSmall from "../../components/loader/LoaderSmall.component";

const LoadingLazyPage = () => {
	return (
		<section className="loader-full-page-css">
			<div className="flex flex-col justify-center items-center min-w-full min-h-dvh gap-2">
				<h1 className="text-gt font-bold text-xl">Ministerio Publico</h1>
				<LoaderSmall />
				<h2 className="text-md font-semibold text-gt">Cargando Sitio</h2>
			</div>
		</section>
	);
};

export default LoadingLazyPage;
