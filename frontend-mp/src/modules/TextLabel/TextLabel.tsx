type Props = {
	subtitle: string;
	text: string;
};

const TextLabel = ({ subtitle, text }: Props) => {
	return (
		<div className="flex flex-col">
			<span className="text-blue-800/90 font-bold text-lg">{subtitle}:</span>
			<span className="text-blue-500/90 font-medium text-md pl-2">{text}</span>
		</div>
	);
};

export default TextLabel;
