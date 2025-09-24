import Title from "@/components/title/Title";
import TextLabel from "@/modules/TextLabel/TextLabel";
import useHookAssignUser from "../hooks/useHookAssignUser";
import { Controller } from "react-hook-form";
import { ComboBoxCustom } from "@/components/forms/ComboBoxCustom";
import LoaderSmall from "@/components/loader/LoaderSmall.component";

const AssignUserPage = () => {
	const { control, errors, users, onSubmit, isLoading } = useHookAssignUser();
	return (
		<section>
			<Title title="Asignación de Fiscal a Caso" />
			<div className="w-full flex items-center justify-center">
				<div className="bg-white p-3 w-full flex flex-col gap-4">
					<TextLabel subtitle="Número de Caso" text="1" />
					<TextLabel subtitle="Nombre" text="Nombre" />
					<TextLabel subtitle="Descripción" text="Descripción" />
				</div>
				<div className="bg-white p-3 w-full">
					<form className="space-y-2" onSubmit={onSubmit}>
						<Controller
							name="idUser"
							control={control}
							render={({ field }) => (
								<ComboBoxCustom
									label="Fiscalia"
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
								className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
							>
								Crear Caso
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
