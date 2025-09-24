export default function HomePage() {
	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
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
