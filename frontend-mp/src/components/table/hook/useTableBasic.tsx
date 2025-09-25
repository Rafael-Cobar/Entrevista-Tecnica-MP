import {
	type ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

interface UseTableBasicProps<T> {
	data: T[];
	headers: ColumnDef<T, any>[];
	hideInput?: boolean;
	dataSizeDefault?: number;
	selectOptions?: number[];
}

export default function useTableBasic<T>({
	data,
	headers,
	hideInput = false,
	dataSizeDefault = 10,
}: UseTableBasicProps<T>) {
	const [sorting, setSorting] = useState<any[]>([]);
	const [filtering, setFiltering] = useState("");

	const table = useReactTable({
		data,
		columns: headers,
		state: {
			sorting,
			globalFilter: filtering,
		},
		onSortingChange: setSorting,
		onGlobalFilterChange: setFiltering,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	// Reset filter si la data cambia
	// biome-ignore lint/correctness/useExhaustiveDependencies: es necesaria
	useEffect(() => {
		setFiltering("");
	}, [data]);

	useEffect(() => {
		table.setPageSize(dataSizeDefault);
	}, [dataSizeDefault, table]);

	const topContent = useMemo(
		() => (
			<div className="flex flex-col md:flex-row md:justify-between gap-2 mb-2">
				{!hideInput && (
					<input
						type="text"
						value={filtering}
						onChange={(e) => setFiltering(e.target.value)}
						placeholder="Buscar..."
						className="border rounded px-3 py-1 w-full md:w-64"
					/>
				)}
			</div>
		),
		[filtering, hideInput],
	);

	return {
		table,
		topContent,
	};
}
