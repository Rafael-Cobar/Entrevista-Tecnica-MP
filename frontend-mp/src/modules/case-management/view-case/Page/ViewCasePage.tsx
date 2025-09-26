import TextLabel from "@/modules/TextLabel/TextLabel";
import useHookViewCase from "../hooks/useHookViewCase";
import Title from "@/components/title/Title";
import TableBasic from "@/components/table/TableBasic";

const ViewCasePage = () => {
	const { dataCase, columnsAssignments, columnsLogs } = useHookViewCase();
	return (
		<section>
			<Title title="Información del caso" />
			<div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
				<div>
					<h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
						Caso
					</h3>
					<div className="grid grid-cols-1 gap-1">
						<TextLabel subtitle="Número de Caso" text={`${dataCase.id}`} />
						<TextLabel subtitle="Nombre" text={dataCase.title} />
						<TextLabel subtitle="Descripción" text={dataCase.description} />
						<TextLabel
							subtitle="Estado del proceso"
							text={dataCase.processState}
						/>
					</div>
				</div>

				<div>
					<h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
						Fiscalía
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-1">
						<TextLabel
							subtitle="Nombres"
							text={dataCase.fiscalia.label ?? ""}
						/>
					</div>
				</div>

				<div>
					<h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
						Fiscal
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<TextLabel
							subtitle="Nombre"
							text={dataCase.fiscal?.names ?? "Sin asignar"}
						/>
						<TextLabel
							subtitle="Apellidos"
							text={dataCase.fiscal?.lastNames ?? "Sin asignar"}
						/>
						<TextLabel
							subtitle="CUI"
							text={dataCase.fiscal?.identification ?? "Sin asignar"}
						/>
					</div>
				</div>
			</div>
			<div className="rounded-lg border bg-white p-4 shadow-sm mt-4">
				<h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
					Bitácora
				</h2>
				<TableBasic
					data={dataCase.logs ?? []}
					headers={columnsLogs}
					onClickRow={() => {}}
					dataSizeDefault={10}
					isLoading={false}
				/>
			</div>
			<div className="rounded-lg border bg-white p-4 shadow-sm mt-4">
				<h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
					Asignaciones
				</h2>
				<TableBasic
					data={dataCase.assignments ?? []}
					headers={columnsAssignments}
					onClickRow={() => {}}
					dataSizeDefault={10}
					isLoading={false}
				/>
			</div>
		</section>
	);
};

export default ViewCasePage;
