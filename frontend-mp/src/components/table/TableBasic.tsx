import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import useTableBasic from "./hook/useTableBasic";

interface TableBasicProps<T> {
	data: T[];
	headers: any[]; // ColumnDef<T, any>[]
	onClickRow: (row: T) => void;
	hideInput?: boolean;
	dataSizeDefault?: number;
	selectOptions?: number[];
	isLoading?: boolean;
}

export default function TableBasic<T>({
	data,
	headers,
	onClickRow,
	hideInput = false,
	dataSizeDefault = 10,
	selectOptions = [10, 15, 30],
	isLoading = false,
}: TableBasicProps<T>) {
	const { table, topContent } = useTableBasic<T>({
		data,
		headers,
		hideInput,
		dataSizeDefault,
		selectOptions,
	});

	return (
		<div className="w-full rounded-lg border shadow-md p-3 bg-white">
			{topContent}
			<div className="overflow-x-auto w-full">
				<div className="min-w-[600px]">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											onClick={header.column.getToggleSortingHandler()}
											className="cursor-pointer select-none hover:bg-blue-50"
										>
											<div className="flex items-center gap-1">
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
												{
													{
														asc: <TiArrowSortedDown size={16} />,
														desc: <TiArrowSortedUp size={16} />,
													}[
														(header.column.getIsSorted() as "asc" | "desc") ||
															""
													]
												}
											</div>
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>

						<TableBody>
							{isLoading ? (
								[...Array(5)].map((_, i) => {
									const uniqueKey = `loading-row-${i}-${Math.random().toString(36).substr(2, 9)}`;
									return (
										<TableRow key={uniqueKey}>
											<TableCell colSpan={headers.length}>
												<div className="h-4 w-3/4 mx-auto bg-gray-200 rounded animate-pulse"></div>
											</TableCell>
										</TableRow>
									);
								})
							) : table.getRowModel().rows.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										onClick={() => onClickRow(row.original)}
										className="hover:bg-blue-100 cursor-pointer transition break-words"
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={headers.length} className="text-center">
										No hay datos
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
			<div className="flex justify-between mt-2 items-center text-sm text-gray-600">
				<span>
					Página {table.getState().pagination.pageIndex + 1} de{" "}
					{table.getPageCount() === 0 ? 1 : table.getPageCount()}
				</span>
				<div className="flex gap-1">
					<button
						type="button"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className="px-2 py-1 border rounded disabled:opacity-50"
					>
						Anterior
					</button>
					<button
						type="button"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className="px-2 py-1 border rounded disabled:opacity-50"
					>
						Siguiente
					</button>
				</div>
			</div>
		</div>
	);
}
