import Title from "@/components/title/Title";
import TextLabel from "@/modules/TextLabel/TextLabel";
import useHookAssignUser from "../hooks/useHookAssignUser";
import { Controller } from "react-hook-form";
import { ComboBoxCustom } from "@/components/forms/ComboBoxCustom";
import LoaderSmall from "@/components/loader/LoaderSmall.component";
import { ROUTES } from "@/routes/routes";

const AssignUserPage = () => {
	const { control, errors, users, onSubmit, isLoading, dataCase } =
		useHookAssignUser();

	return (
		<section>
			<Title
				title="Asignación de Fiscal a Caso"
				to={ROUTES.case_management.cases}
			/>
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
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

					{dataCase.fiscal?.names && (
						<div>
							<h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
								Fiscal
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<TextLabel
									subtitle="Nombre"
									text={dataCase.fiscal?.names ?? ""}
								/>
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
					)}
				</div>

				<div className="bg-white rounded-2xl shadow p-4">
					<form className="space-y-4" onSubmit={onSubmit}>
						<Controller
							name="idUser"
							control={control}
							render={({ field }) => (
								<ComboBoxCustom
									label="Fiscal"
									value={field.value}
									onValueChange={field.onChange}
									error={errors.idUser?.message}
									data={users}
								/>
							)}
						/>

						{!isLoading ? (
							<button
								type="submit"
								className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
							>
								Asignar caso
							</button>
						) : (
							<div className="flex justify-center">
								<LoaderSmall />
							</div>
						)}
					</form>
				</div>
			</div>
		</section>
	);
};

export default AssignUserPage;
