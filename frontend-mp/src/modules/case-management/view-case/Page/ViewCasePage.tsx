import TextLabel from "@/modules/TextLabel/TextLabel";
import useHookViewCase from "../hooks/useHookViewCase";
import Title from "@/components/title/Title";

const ViewCasePage = () => {
	const { dataCase } = useHookViewCase();
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
						<TextLabel subtitle="Nombre" text={dataCase.fiscal?.names ?? ""} />
						<TextLabel
							subtitle="Apellidos"
							text={dataCase.fiscal?.lastNames ?? ""}
						/>
						<TextLabel
							subtitle="CUI"
							text={dataCase.fiscal?.identification ?? ""}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ViewCasePage;
