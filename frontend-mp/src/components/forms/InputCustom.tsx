import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
	label: string;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	register?: UseFormRegisterReturn;
	error?: string;
};

const InputCustom: React.FC<Props> = ({
	label,
	inputProps,
	register,
	error,
}) => {
	return (
		<div className="mb-4">
			<label className="block text-sm font-bold text-gray-700 mb-1">
				{label}
				<input
					{...inputProps}
					{...register}
					className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none 
          ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"}
          ${inputProps?.className ?? ""}`}
				/>
			</label>
			<p className={`text-red-500 text-sm mt-1 ${!error ? "invisible" : ""}`}>
				{error || "-"}
			</p>
		</div>
	);
};

export default InputCustom;
