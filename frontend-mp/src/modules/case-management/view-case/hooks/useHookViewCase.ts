import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStoreCase } from "@/store/zustand/case/useStoreCase";
import { ROUTES } from "@/routes/routes";

export default function useHookViewCase() {
	// const [isLoading, setIsLoading] = useState(false);
	const dataCase = useStoreCase((state) => state.data);
	const navigate = useNavigate();

	// biome-ignore lint/correctness/useExhaustiveDependencies: necesario
	useEffect(() => {
		if (!dataCase.id) {
			navigate(ROUTES.case_management.cases);
			return;
		}
	}, []);

	return {
		dataCase,
	};
}
