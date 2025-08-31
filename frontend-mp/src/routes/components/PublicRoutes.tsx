import { Navigate, Outlet } from "react-router-dom";
import useAuthHook from "../../hooks/useAuthHook";
import LoadingLazyPage from "../../modules/loading/LoadingLazyPage";
import { ROUTES } from "../routes";

export default function PublicRoutes() {
	const { loading, isAuthenticated } = useAuthHook();

	if (loading) return <LoadingLazyPage />;
	if (isAuthenticated) return <Navigate to={ROUTES.home} replace />;

	return <Outlet />;
}
