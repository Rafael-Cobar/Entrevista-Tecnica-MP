import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./routes";
import LoginPage from "../modules/auth/login/page/LoginPage";
import Page404 from "../modules/error/Page404";
import PublicRoutes from "./components/PublicRoutes";
import ProtectedRoutes from "./components/ProtectedRoutes";

export const router = createBrowserRouter([
	{
		element: <PublicRoutes />,
		children: [{ path: ROUTES.login, element: <LoginPage /> }],
	},
	{
		element: <ProtectedRoutes />,
		children: [],
	},
	{
		path: "*",
		element: <Page404 />,
	},
]);
