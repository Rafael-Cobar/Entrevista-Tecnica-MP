import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../modules/auth/login/page/LoginPage";
import Page404 from "../modules/error/Page404";
import PublicRoutes from "./components/PublicRoutes";
import { ROUTES } from "./routes";

const LazyHome = lazy(() => import("../modules/home/HomePage"));

export const router = createBrowserRouter([
	{
		element: <PublicRoutes />,
		children: [{ path: ROUTES.login, element: <LoginPage /> }],
	},
	{
		element: <PublicRoutes />,
		children: [{ path: ROUTES.home, element: <LazyHome /> }],
	},
	{
		path: "*",
		element: <Page404 />,
	},
]);
