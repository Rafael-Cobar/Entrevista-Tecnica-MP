import Title from "@/components/title/Title";
import useCasesPage from "../hook/useCasesPage";
import TableBasic from "@/components/table/TableBasic";
import { Download, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

const CasesPage = () => {
	const { isAdmin, cases, columns } = useCasesPage();

	return (
		<section className="space-y-6">
			<Title title="Gestión de Casos" />
			<div className="flex items-center justify-between">
				<div className="flex gap-2">
					{isAdmin && (
						<NavLink
							to={ROUTES.case_management.create_case}
							className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
						>
							<Plus className="h-4 w-4" />
							Crear Caso
						</NavLink>
					)}
					<button
						type="button"
						className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
					>
						<Download className="h-4 w-4" />
						Descargar informe
					</button>
				</div>
			</div>

			<div className="rounded-lg border bg-white p-4 shadow-sm">
				<h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
					Casos
				</h2>
				<TableBasic
					data={cases}
					headers={columns}
					onClickRow={() => {}}
					dataSizeDefault={10}
					isLoading={false}
				/>
			</div>
		</section>
	);
};

export default CasesPage;
