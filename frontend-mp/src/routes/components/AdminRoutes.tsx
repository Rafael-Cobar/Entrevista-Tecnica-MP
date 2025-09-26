import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../routes";
import { useStoreAuth } from "@/store/zustand/auth/useStoreAuth";

export default function AdminProtectedRoutes() {
	const roles = useStoreAuth((state) => state.user.roles);

	const isAdmin = roles.find((rol) => rol.id === 1);

	if (!isAdmin) return <Navigate to={ROUTES.home} replace />;

	return <Outlet />;
}
