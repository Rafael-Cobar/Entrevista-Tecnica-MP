import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../modules/auth/login/page/LoginPage";
import Page404 from "../modules/error/Page404";
import PublicRoutes from "./components/PublicRoutes";
import { ROUTES } from "./routes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MainLayout from "../layouts/main-layout/MainLayout";
import AdminProtectedRoutes from "./components/AdminRoutes";
import FiscalProtectedRoutes from "./components/FiscalorAdminRoutes";
import FiscalOrAdminProtectedRoutes from "./components/FiscalorAdminRoutes";

const LazyHome = lazy(() => import("../modules/home/HomePage"));
const LazyCreateCase = lazy(
	() => import("../modules/case-management/create-case/page/CreateCasePage"),
);
const LazyAssignUserCase = lazy(
	() => import("../modules/case-management/assign-user/page/AssignUserPage"),
);
const LazyCases = lazy(
	() => import("../modules/case-management/cases/page/CasesPage"),
);

export const router = createBrowserRouter([
	{
		element: <PublicRoutes />,
		children: [{ path: ROUTES.login, element: <LoginPage /> }],
	},
	{
		element: <ProtectedRoutes />,
		children: [
			{
				element: <MainLayout />,
				children: [
					{ path: ROUTES.home, element: <LazyHome /> },
					{
						element: <AdminProtectedRoutes />,
						children: [
							{
								path: ROUTES.case_management.create_case,
								element: <LazyCreateCase />,
							},
							{
								path: ROUTES.case_management.assign_user.path,
								element: <LazyAssignUserCase />,
							},
						],
					},
					{
						element: <FiscalOrAdminProtectedRoutes />,
						children: [
							{
								path: ROUTES.case_management.cases,
								element: <LazyCases />,
							},
						],
					},
				],
			},
		],
	},
	{
		path: "*",
		element: <Page404 />,
	},
]);
