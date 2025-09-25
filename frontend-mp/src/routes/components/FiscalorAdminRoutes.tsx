import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../routes";
import { useStoreAuth } from "@/store/zustand/auth/useStoreAuth";

export default function FiscalOrAdminProtectedRoutes() {
	const roles = useStoreAuth((state) => state.user.roles);

	const flag = roles.find((rol) => rol.id === 1 || rol.id === 2);

	if (!flag) return <Navigate to={ROUTES.home} replace />;

	return <Outlet />;
}
