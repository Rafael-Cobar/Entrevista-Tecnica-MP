import { useEffect, useState } from "react";

export default function useAuthHook() {
	const [loading, setLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		setLoading(true);

		setLoading(false);
	}, []);

	return {
		loading,
		isAuthenticated,
	};
}
