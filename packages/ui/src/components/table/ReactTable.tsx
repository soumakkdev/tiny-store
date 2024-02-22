import { cn } from '@/lib/utils'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import Loader from '../loader/Loader'

interface IReactTable {
	resizable?: boolean
	columns: any[]
	data: any[]
	onRowClick?: (rowData: any) => void
	className?: string
	isLoading?: boolean
}

export const ReactTable = ({ columns, data, onRowClick, resizable, className, isLoading }: IReactTable) => {
	const table = useReactTable({
		columns,
		data,
		columnResizeMode: 'onChange',
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div
			className={cn(
				'relative w-full h-full flex-1 flex flex-col overflow-auto ring-1 ring-border sm:rounded-lg',
				{ 'pointer-events-none overflow-hidden': isLoading },
				className
			)}
		>
			{isLoading && (
				<div className="absolute inset-0 backdrop-blur-sm">
					<Loader />
				</div>
			)}

			<Table className="min-w-full divide-y divide-border" style={{ width: table.getCenterTotalSize() }}>
				<TableHeader className="min-w-full divide-y divide-border">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className={cn('divide-x divide-border w-[fit-content]', { flex: resizable })}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									style={{
										width: header.getSize(),
									}}
									className="sticky top-0 z-10 whitespace-nowrap h-auto px-3 py-2 text-left text-sm font-medium bg-muted text-foreground"
								>
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}

									{resizable ? (
										<div
											{...{
												onMouseDown: header.getResizeHandler(),
												onTouchStart: header.getResizeHandler(),
												className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
											}}
										/>
									) : null}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>

				{data?.length ? (
					<TableBody>
						{table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								className={cn('divide-x divide-border w-[fit-content]', { flex: resizable })}
								onClick={() => onRowClick?.(row.original)}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										style={{
											width: cell.column.getSize(),
										}}
										className="whitespace-nowrap px-3 py-2 text-sm text-foreground"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				) : null}
			</Table>

			{!data?.length ? <div className="flex-1 grid place-content-center h-full w-full ">No results found</div> : null}
		</div>
	)
}
