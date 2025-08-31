import { useEffect, useState } from "react";

export default function useAuthHook() {
	const [loading, setLoading] = useState(false);
	const [isAuthenticated, _setIsAuthenticated] = useState(false);

	useEffect(() => {
		setLoading(true);

		setLoading(false);
	}, []);

	return {
		loading,
		isAuthenticated,
	};
}
