import { TooltipCustom } from "@/components/tooltip/TooltipCustom";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { MdChangeCircle } from "react-icons/md";
import {
	useHookChangeCaseState,
	type PropsChangeCaseState,
} from "./hook/useHookChangeCaseState";
import { Controller } from "react-hook-form";
import { ComboBoxCustom } from "@/components/forms/ComboBoxCustom";
import LoaderSmall from "@/components/loader/LoaderSmall.component";

const ChangeCaseState = ({ data, onClose }: PropsChangeCaseState) => {
	const {
		catalogStates,
		close,
		control,
		isLoading,
		errors,
		isModalOpen,
		onSubmit,
		open,
		setIsModalOpen,
	} = useHookChangeCaseState({
		data,
		onClose,
	});

	return (
		<Dialog
			open={isModalOpen}
			onOpenChange={(isOpen) => {
				setIsModalOpen(isOpen);
				if (!isOpen && close) {
					close();
				}
			}}
		>
			<DialogTrigger asChild>
				<TooltipCustom content={"Ver caso"}>
					<button
						type="button"
						onClick={open}
						className="text-amber-600 hover:text-amber-800"
					>
						<MdChangeCircle size={18} />
					</button>
				</TooltipCustom>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-blue-700 font-bold ">
						Cambiar estado
					</DialogTitle>
					<DialogDescription>
						<div className="bg-gray-50 rounded-xl p-4 mb-4 border space-y-2">
							<div className="grid grid-cols-2">
								<span className="font-medium text-gray-700">
									Número de caso:
								</span>
								<span className="text-gray-900">{data.idCase}</span>
							</div>
							<div className="grid grid-cols-2">
								<span className="font-medium text-gray-700">Nombre:</span>
								<span className="text-gray-900">{data.title}</span>
							</div>
							<div>
								<span className="font-medium text-gray-700">Descripción:</span>
								<p className="text-gray-900 text-sm mt-1">{data.description}</p>
							</div>
						</div>
						<form className="mt-2" onSubmit={onSubmit}>
							<Controller
								name="state"
								control={control}
								render={({ field }) => (
									<ComboBoxCustom
										label="Estado"
										value={field.value}
										onValueChange={field.onChange}
										error={errors.state?.message}
										data={catalogStates}
									/>
								)}
							/>
							{!isLoading ? (
								<button
									type="submit"
									className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
								>
									Actualizar
								</button>
							) : (
								<div className="flex justify-center">
									<LoaderSmall />
								</div>
							)}
						</form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default ChangeCaseState;
