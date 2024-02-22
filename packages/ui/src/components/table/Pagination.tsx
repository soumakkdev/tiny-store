import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, RefreshCwIcon } from 'lucide-react'
import { Tooltip } from '../tooltip/Tooltip'
import { Button } from '../button/Button'

interface IPagination {
	totalCount: number
	currentPage: number
	itemsPerPage: number
	handleNext: () => void
	handlePrev: () => void
	jumpToPage: (pgNo: number) => void
	lastPage?: boolean
	isLoading?: boolean
	hidePageInfo?: boolean
	hideJumpBtns?: boolean
	handleRefresh?: () => void
	showPageSizeController?: boolean
	pageSizeOptions?: any[]
	selectedPageSize?: number
	onPageSizeChange?: (pgSize: number) => void
	className?: string
	tableId?: string
}

export function Pagination({
	totalCount = 0,
	currentPage = 1,
	itemsPerPage,
	handleNext,
	handlePrev,
	lastPage,
	isLoading,
	jumpToPage,
	hidePageInfo,
	hideJumpBtns,
	handleRefresh,
	showPageSizeController,
	pageSizeOptions = [],
	selectedPageSize,
	onPageSizeChange,
	className,
	tableId,
}: IPagination) {
	const [isRefreshing, setIsRefreshing] = useState(false)
	const upperLimitForPage = itemsPerPage * currentPage
	const upperLimit = lastPage ? totalCount : upperLimitForPage
	const totalNoOfPages = Math.ceil(totalCount / itemsPerPage) || 1

	// const scrollTableToTop = () => {
	// 	const { isVisible, element } = isElementVisible({
	// 		elementId: tableId,
	// 		attributeName: TABLE_COMPONENT_DATA_ATTRIBUTE_ID,
	// 		attributeValue: TABLE_COMPONENT_DATA_ATTRIBUTE_VALUE,
	// 	})
	// 	if (isVisible) {
	// 		element.scrollTo(0, 0)
	// 	}
	// }
	const totalCountComponent = () => {
		if (!totalCount) {
			return (
				<div className="hidden lg:flex">
					<p className="text-primary text-sm">
						Showing <span className="">0</span> of <span className="">0</span> results
					</p>
				</div>
			)
		}
		return (
			<div className="hidden md:flex">
				<p className=" text-primary text-sm">
					Showing <span className="">{itemsPerPage * (currentPage - 1) + 1}</span> to <span className="">{upperLimit}</span> of{' '}
					<span className="">{totalCount}</span> results
				</p>
			</div>
		)
	}

	return (
		<div className={clsx('flex sm:gap-3 items-center justify-between', className)}>
			<div className="flex flex-row sm:flex-wrap items-center gap-2 lg:gap-4">
				{/* {showPageSizeController && (
					<div className='flex items-center gap-2'>
						<p className='hidden md:block text-xs md:text-sm '>Items per page</p>
						<Dropdown
							options={pageSizeOptions}
							menuBtnClassName='h-8'
							menuWidth={160}
							noCapitalize={true}
							customSelectedTitle={`${selectedPageSize}`}
							title='Page Size'
							selected={selectedPageSize}
							onChange={(value) => {
								// scrollTableToTop()
								onPageSizeChange?.(value)
							}}
						/>
					</div>
				)} */}
				<div className="flex items-center gap-2">
					{/* {!hidePageInfo && totalCountComponent()} */}
					{handleRefresh && (
						<button
							className="flex items-center px-2 py-1 rounded-md outline-none mt-[-4px]"
							onClick={async () => {
								try {
									setIsRefreshing(true)
									await handleRefresh()
									setIsRefreshing(false)
								} catch (err) {
									setIsRefreshing(false)
								}
							}}
							disabled={isRefreshing}
						>
							<RefreshCwIcon
								className={`${isRefreshing ? 'animate-spin' : ''} w-5 h-5 text-primary cursor-pointer`}
								style={{ animationDirection: 'reverse' }}
							/>
						</button>
					)}
				</div>
			</div>
			<div className="flex items-center gap-2">
				{/* Jump to first page button */}
				{!hideJumpBtns && (
					<Tooltip>
						<Tooltip.Trigger>
							<Button
								disabled={currentPage === 1 || isLoading}
								onClick={() => {
									// scrollTableToTop()
									jumpToPage(1)
								}}
								type="button"
								variant="outline"
								className="h-10 w-10 rounded-full flex items-center justify-center p-0"
								// className='h-8 justify-center border text-primary px-2 md:px-4 py-1 font-bold'
							>
								<ChevronsLeft className="w-5 h-5 mr-0.5 text-muted-foreground" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<div>
								<p className="text-white text-xs font-light">Go to first page</p>
							</div>
						</Tooltip.Content>
					</Tooltip>
				)}

				{/* Go to prev page button */}
				<Tooltip>
					<Tooltip.Trigger>
						<Button
							disabled={currentPage === 1 || isLoading}
							onClick={() => {
								// scrollTableToTop()
								handlePrev()
							}}
							type="button"
							variant="outline"
							className="h-10 w-10 rounded-full flex items-center justify-center p-0"
							// className='h-8 justify-center border text-primary px-2 md:px-4 py-1 font-bold'
						>
							<ChevronLeft className="w-5 h-5 mr-0.5 text-muted-foreground" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<div>
							<p className="text-white text-xs font-light">Prev</p>
						</div>
					</Tooltip.Content>
				</Tooltip>

				{/* Page no. input field */}
				<Tooltip>
					<Tooltip.Trigger>
						<PageInput
							currentPage={currentPage}
							jumpToPage={(pgNo) => {
								// scrollTableToTop()
								jumpToPage(pgNo)
							}}
							totalNoOfPages={totalNoOfPages}
							isDisabled={!!isLoading}
						/>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<div>
							<p className="text-white text-xs font-light">Go to page no.</p>
						</div>
					</Tooltip.Content>
				</Tooltip>

				{/* Show current page no info */}
				<p className="text-sm  whitespace-nowrap">of {totalNoOfPages}</p>

				{/* Go to next page button */}
				<Tooltip>
					<Tooltip.Trigger>
						<Button
							disabled={lastPage || currentPage * itemsPerPage >= totalCount || isLoading}
							onClick={() => {
								// scrollTableToTop()
								handleNext?.()
							}}
							type="button"
							variant="outline"
							className="h-10 w-10 rounded-full flex items-center justify-center p-0"
							// className='h-8 justify-center border text-primary px-2 md:px-4 py-1 font-bold'
						>
							<ChevronRight className="w-5 h-5 ml-0.5 text-muted-foreground" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p className="text-white text-xs font-light">Next</p>
					</Tooltip.Content>
				</Tooltip>

				{/* Go to last page button */}
				{!hideJumpBtns && (
					<Tooltip>
						<Tooltip.Trigger>
							<Button
								disabled={lastPage || currentPage * itemsPerPage >= totalCount || isLoading}
								onClick={() => {
									// scrollTableToTop()
									jumpToPage(totalNoOfPages)
								}}
								type="button"
								className="h-10 w-10 rounded-full flex items-center justify-center p-0"
								variant="outline"
								// className='h-8 justify-center border text-primary px-2 md:px-4 py-1 font-bold'
							>
								<ChevronsRight className="w-5 h-5 ml-0.5 text-muted-foreground" />
							</Button>
						</Tooltip.Trigger>

						<Tooltip.Content>
							<div>
								<p className="text-white text-xs font-light">Go to last page</p>
							</div>
						</Tooltip.Content>
					</Tooltip>
				)}
			</div>
		</div>
	)
}

function PageInput({
	jumpToPage,
	currentPage,
	totalNoOfPages,
	isDisabled,
}: {
	currentPage: number
	jumpToPage: (pgNo: number) => void
	totalNoOfPages: number
	isDisabled: boolean
}) {
	const [tempCurrentPage, setTempCurrentPage] = useState(currentPage)

	useEffect(() => {
		if (currentPage) {
			setTempCurrentPage(currentPage)
		}
	}, [currentPage])

	return (
		<input
			className="h-9 w-16 border border-divider bg-background outline-none rounded-lg p-2 px-3 text-sm disabled:opacity-60"
			onChange={(event) => {
				event.preventDefault()
				const value = event.currentTarget.value
				setTempCurrentPage(parseInt(value))
			}}
			value={tempCurrentPage || ''}
			type="number"
			onKeyPress={(e) => {
				if (e.key === 'Enter') {
					e.preventDefault()
					if (tempCurrentPage > 0 && tempCurrentPage <= totalNoOfPages) {
						jumpToPage(tempCurrentPage)
					}
				}
			}}
			min={1}
			max={totalNoOfPages}
			disabled={isDisabled}
		/>
	)
}
