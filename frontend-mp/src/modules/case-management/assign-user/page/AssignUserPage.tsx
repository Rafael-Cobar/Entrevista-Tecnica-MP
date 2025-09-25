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
				<div className="bg-white rounded-2xl shadow p-4 flex flex-col gap-4">
					<TextLabel subtitle="Número de Caso" text={`${dataCase.id}`} />
					<TextLabel subtitle="Nombre" text={dataCase.title} />
					<TextLabel subtitle="Descripción" text={dataCase.description} />
					<TextLabel subtitle="Fiscalía" text={dataCase.fiscalia.label ?? ""} />
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
