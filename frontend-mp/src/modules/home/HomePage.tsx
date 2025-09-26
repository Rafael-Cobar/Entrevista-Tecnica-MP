import Title from "@/components/title/Title";
import { useStoreAuth } from "@/store/zustand/auth/useStoreAuth";

export default function HomePage() {
	const { names, lastNames, roles } = useStoreAuth((state) => state.user);
	const rol = roles.find((r) => r.id === 1)?.id;
	const rolString = roles.map((r) => r.rol);

	return (
		<section className="min-h-screen flex flex-col bg-gray-50">
			<Title title="Plataforma del Ministerio Público" hideBackBtn />
			<header className="bg-white shadow-md w-full py-6 px-6">
				<h1 className="text-2xl font-bold text-gray-800">
					Bienvenido,{" "}
					<span className="text-amber-600">{`${names} ${lastNames}`} </span>
				</h1>
				<p className="text-gray-600">
					Rol:{" "}
					<span className="font-medium capitalize">{rolString.join(", ")}</span>
				</p>
			</header>

			<div className="flex-grow flex flex-col items-center justify-center text-center px-4">
				<p className="text-gray-600 mb-8 max-w-2xl">
					Actualmente tienes acceso al módulo de <b>gestión de casos</b>. Esta
					herramienta ha sido diseñada para que los miembros del Ministerio
					Público puedan trabajar de manera eficiente y segura.
				</p>

				<div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-left">
					<h3 className="text-lg font-semibold text-gray-700 mb-4">
						Funciones disponibles para tu rol
					</h3>
					<ul className="list-disc list-inside text-gray-600 space-y-2">
						{rol === 1 ? (
							<>
								<li>Crear nuevos casos</li>
								<li>Editar casos existentes</li>
								<li>Cambiar el estado de los casos</li>
								<li>Asignar fiscales</li>
								<li>Visualizar y descargar casos</li>
							</>
						) : (
							<>
								<li>Visualizar casos</li>
								<li>Cambiar el estado de los casos</li>
								<li>Descargar información de los casos</li>
							</>
						)}
					</ul>
				</div>
			</div>

			<footer className="bg-gray-100 text-gray-600 py-4 text-center text-sm">
				© {new Date().getFullYear()} Ministerio Público de Guatemala.
				<br />
				<span className="text-xs">
					Desarrollado por Ing. Estanley Rafael Cóbar García
				</span>
			</footer>
		</section>
	);
}
