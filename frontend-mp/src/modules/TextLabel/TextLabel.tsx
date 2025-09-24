type Props = {
	subtitle: string;
	text: string;
};

const TextLabel = ({ subtitle, text }: Props) => {
	return (
		<div className="flex flex-col">
			<span className="text-gtDark/90 font-bold text-lg">{subtitle}:</span>
			<span className="text-gt/90 font-medium text-md pl-2">{text}</span>
		</div>
	);
};

export default TextLabel;
