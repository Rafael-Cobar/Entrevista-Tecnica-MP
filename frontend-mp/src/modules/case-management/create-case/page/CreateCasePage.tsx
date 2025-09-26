import InputCustom from "@/components/forms/InputCustom";
import useHookCreateCase from "../hooks/useHookCreateCase";
import LoaderSmall from "@/components/loader/LoaderSmall.component";
import { Controller } from "react-hook-form";
import { ComboBoxCustom } from "@/components/forms/ComboBoxCustom";
import TextAreaCustom from "@/components/forms/TextAreaCustom";
import Title from "@/components/title/Title";

const CreateCasePage = () => {
	const {
		control,
		errors,
		fiscalias,
		isLoading,
		onSubmit,
		register,
		clearForm,
	} = useHookCreateCase();

	return (
		<section>
			<Title title="Crear Caso" />
			<div className="w-full flex items-center justify-center">
				<div className="bg-white p-3 w-full">
					<form className="space-y-4" onSubmit={onSubmit}>
						<InputCustom
							label="Nombre"
							error={errors.title?.message}
							register={register("title")}
							inputProps={{ type: "text", autoFocus: true }}
						/>
						<TextAreaCustom
							label="Descripción"
							error={errors.description?.message}
							register={register("description")}
						/>
						<Controller
							name="idFiscalia"
							control={control}
							render={({ field }) => (
								<ComboBoxCustom
									label="Fiscalia"
									value={field.value}
									onValueChange={field.onChange}
									error={errors.idFiscalia?.message}
									data={fiscalias}
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
						<button
							type="button"
							onClick={clearForm}
							className="w-1/2 md:w-1/4 bg-gray-400 text-white py-2 rounded-lg hover:bg-blue-700 transition"
						>
							Limpiar
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default CreateCasePage;
