// biome-ignore assist/source/organizeImports: es necesario
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/routes/routes";
import { NavLink } from "react-router-dom";
import { items } from "../routes-main-layout";
import { LogOutIcon } from "lucide-react";

const SidebarCustom = () => {
	return (
		<Sidebar
			collapsible="icon"
			className="text-white bg-gradient-to-b from-blue-700 via-blue-600 to-blue-800 shadow-xl "
		>
			<SidebarHeader className="border-b border-blue-500/40">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<NavLink to={ROUTES.home}>
								<SidebarTrigger />
								<h2 className="font-bold text-2xl">Casos MP</h2>
							</NavLink>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<NavLink to={item.to} className={"flex items-center"}>
											<item.icon size={22} />
											<span className="text-base font-medium">
												{item.title}
											</span>
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-t border-blue-500/40 p-3">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<NavLink to={ROUTES.home} className={"flex items-center"}>
								<LogOutIcon size={22} />
								<span className="text-base font-medium">Cerrar sesión</span>
							</NavLink>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};

export default SidebarCustom;
