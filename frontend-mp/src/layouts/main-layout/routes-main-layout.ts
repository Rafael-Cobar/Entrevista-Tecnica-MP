import { ROUTES } from "@/routes/routes";
import { Home, Text } from "lucide-react";

// Menu items.
export const items = [
	{
		title: "Home",
		to: ROUTES.home,
		icon: Home,
	},
	{
		title: "Gestión de casos",
		to: "/",
		icon: Text,
	},
];
