import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
	label: string;
	textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
	register?: UseFormRegisterReturn;
	error?: string;
};

const TextAreaCustom: React.FC<Props> = ({
	label,
	textareaProps,
	register,
	error,
}) => {
	return (
		<div className="mb-4">
			<label className="block text-sm font-bold text-gray-700 mb-1">
				{label}
				<textarea
					{...textareaProps}
					{...register}
					className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none resize-none
          ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"}
          ${textareaProps?.className ?? ""}`}
					rows={5}
				/>
			</label>
			<p className={`text-red-500 text-sm mt-1 ${!error ? "invisible" : ""}`}>
				{error || "-"}
			</p>
		</div>
	);
};

export default TextAreaCustom;
