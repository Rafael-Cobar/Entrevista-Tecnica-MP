import { useEffect, useState } from "react";
import { useStoreAuth } from "../store/zustand/auth/useStoreAuth";

export default function useAuthHook() {
	const [loading, setLoading] = useState(false);
	const isAuthenticated = useStoreAuth((state) => state.authenticated);

	useEffect(() => {
		setLoading(true);
		// TODO: Consumir endpoint de verificación
		setLoading(false);
	}, []);

	return {
		loading,
		isAuthenticated,
	};
}
