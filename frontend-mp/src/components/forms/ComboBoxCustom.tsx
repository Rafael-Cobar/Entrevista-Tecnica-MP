import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface DataComboBox {
	label: string;
	value: string;
}

interface ComboBoxCustomProps {
	label: string;
	value: string | null;
	data: DataComboBox[];
	onValueChange: (val: string) => void;
	error: string | undefined;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function ComboBoxCustom({
	label,
	value,
	onValueChange,
	data,
	error,
	inputProps,
}: ComboBoxCustomProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<span className="block text-sm font-bold text-gray-700 mb-1">
				{label}
			</span>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger className="w-full">
					<Button
						variant="outline"
						role="combobox"
						type="button"
						aria-expanded={open}
						className={`w-full justify-between ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-500"}
          ${inputProps?.className ?? ""}`}
					>
						{value
							? data.find((f) => f.value === value)?.label
							: "Selecciona una opción"}
						<ChevronsUpDown className="opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="min-w-full p-0">
					<Command className="w-full">
						<CommandInput placeholder="Selecciona una opción" className="h-9" />
						<CommandList>
							<CommandEmpty>Sin resultados</CommandEmpty>
							<CommandGroup>
								{data.map((d) => (
									<CommandItem
										key={d.value}
										value={d.label}
										keywords={[d.value]}
										onSelect={() => {
											onValueChange(d.value);
											setOpen(false);
										}}
										className="w-full justify-between"
									>
										{d.label}
										<Check
											className={cn(
												"ml-auto",
												value === d.value ? "opacity-100" : "opacity-0",
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
			<p className={`text-red-500 text-sm ${!error ? "invisible" : ""}`}>
				{error || "-"}
			</p>
		</>
	);
}
