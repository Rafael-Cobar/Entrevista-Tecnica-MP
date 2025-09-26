import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ReactNode } from "react";

interface TooltipWrapperProps {
	content: string | ReactNode;
	children: ReactNode;
}

export function TooltipCustom({ content, children }: TooltipWrapperProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>
					{typeof content === "string" ? <p>{content}</p> : content}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
