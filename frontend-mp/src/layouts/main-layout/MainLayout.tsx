import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarCustom from "./components/SidebarCustom";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<SidebarProvider>
			<SidebarCustom />
			<main className="w-full bg-gray-50 min-h-screen">
				<div className="p-4">
					<Outlet />
				</div>
			</main>
		</SidebarProvider>
	);
};

export default MainLayout;
