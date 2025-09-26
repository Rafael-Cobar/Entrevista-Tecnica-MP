import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../modules/auth/login/page/LoginPage";
import Page404 from "../modules/error/Page404";
import PublicRoutes from "./components/PublicRoutes";
import { ROUTES } from "./routes";
import ProtectedRoutes from "./components/ProtectedRoutes";
import MainLayout from "../layouts/main-layout/MainLayout";
import AdminProtectedRoutes from "./components/AdminRoutes";
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
const LazyViewCase = lazy(
	() => import("../modules/case-management/view-case/Page/ViewCasePage"),
);
const LazyUpdateCase = lazy(
	() => import("../modules/case-management/update-case/page/UpdateCasePage"),
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
							{
								path: ROUTES.case_management.update.path,
								element: <LazyUpdateCase />,
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
							{
								path: ROUTES.case_management.case,
								element: <LazyViewCase />,
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
