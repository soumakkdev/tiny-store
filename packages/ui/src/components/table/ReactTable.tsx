import { cn } from '@/lib/utils'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Loader } from '../loader/Loader'

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
				'tw-relative tw-w-full tw-h-full tw-flex-1 tw-flex tw-flex-col tw-overflow-auto tw-ring-1 tw-ring-border sm:tw-rounded-lg',
				{ 'tw-pointer-events-none tw-overflow-hidden': isLoading },
				className
			)}
		>
			{isLoading && (
				<div className="tw-absolute tw-inset-0 tw-backdrop-blur-sm">
					<Loader />
				</div>
			)}

			<Table className="tw-min-w-full tw-divide-y tw-divide-border" style={{ width: table.getCenterTotalSize() }}>
				<TableHeader className="tw-min-w-full tw-divide-y tw-divide-border">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id} className={cn('tw-divide-x tw-divide-border tw-w-[fit-content]', { flex: resizable })}>
							{headerGroup.headers.map((header) => (
								<TableHead
									key={header.id}
									style={{
										width: header.getSize(),
									}}
									className="tw-sticky tw-top-0 tw-z-10 tw-whitespace-nowrap tw-h-auto tw-px-3 tw-py-2 tw-text-left tw-text-sm tw-font-medium tw-bg-muted tw-text-foreground"
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
								className={cn('tw-divide-x tw-divide-border tw-w-[fit-content]', { flex: resizable })}
								onClick={() => onRowClick?.(row.original)}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell
										key={cell.id}
										style={{
											width: cell.column.getSize(),
										}}
										className="tw-whitespace-nowrap tw-px-3 tw-py-2 tw-text-sm tw-text-foreground"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				) : null}
			</Table>

			{!data?.length ? <div className="tw-flex-1 tw-grid tw-place-content-center tw-h-full tw-w-full ">No results found</div> : null}
		</div>
	)
}
