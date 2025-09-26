import { MdOutlineChevronLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Props = {
	title: string;
	hideBackBtn?: boolean;
	to?: string;
};

const Title = ({ title, hideBackBtn = false, to }: Props) => {
	const navigate = useNavigate();

	return (
		<div className="w-full">
			<div className="flex flex-row items-center gap-2">
				{!hideBackBtn && (
					<button
						type="button"
						className="text-4xl text-gt hover:text-gtDark bg-blue-400/50 rounded-full"
						onClick={() => (to ? navigate(to) : navigate(-1))}
					>
						<MdOutlineChevronLeft />
					</button>
				)}
				<h1 className="text-blue-700 text-4xl font-bold md:text-5xl py-1.5">
					{title}
				</h1>
			</div>
			<div className="border-t border-blue-600"></div>
		</div>
	);
};

export default Title;
