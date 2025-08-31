import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

export default function HomePage() {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<header className="bg-blue-600 text-white py-6 shadow-md">
				<div className="container mx-auto px-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold">Plataforma de Vinculación</h1>

					<button
						type="button"
						onClick={() => {
							navigate(ROUTES.login);
						}}
						className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium hover:cursor-pointer"
					>
						Cerrar sesión
					</button>
				</div>
			</header>
			<main className="flex-grow flex flex-col items-center justify-center text-center px-4">
				<h2 className="text-4xl font-extrabold text-gray-800 mb-4">
					Bienvenido a la Plataforma del Ministerio Público
				</h2>
				<p className="text-gray-600 mb-8 max-w-xl">
					Esta plataforma te permitirá gestionar los miembros de manera sencilla
					y eficiente.
				</p>
			</main>
			<footer className="bg-gray-100 text-gray-600 py-4 text-center">
				© {new Date().getFullYear()} Ministerio Público. Todos los derechos
				reservados. - Ing. Estanley Rafael Cóbar García
			</footer>
		</div>
	);
}
