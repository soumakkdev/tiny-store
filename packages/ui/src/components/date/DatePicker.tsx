import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../button/Button'
import { Calendar } from '../ui/calendar'

dayjs.extend(LocalizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

interface IDatePicker {
	id?: string
	value: string
	className?: string
	onChange: (date: string | null) => void
	disabled?: boolean
	timezone?: string
	maxDate?: string
	minDate?: string
}

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export function DatePicker(props: IDatePicker) {
	const { value, onChange, disabled, timezone, id, className, maxDate, minDate } = props
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild id={id}>
				<Button variant="outline" type="button">
					{value ? (
						dayjs(value)
							.local()
							.tz(timezone || userTimezone)
							.format('dd/MM/yyyy')
					) : (
						<span>Pick a date</span>
					)}
					<CalendarIcon className="tw-ml-auto tw-h-4 tw-w-4 tw-opacity-80" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="tw-w-auto tw-p-0" align="start">
				<Calendar
					fromDate={minDate ? dayjs(minDate).toDate() : undefined}
					toDate={maxDate ? dayjs(maxDate).toDate() : undefined}
					mode="single"
					selected={dayjs(value)?.toDate()}
					onSelect={(value) => {
						onChange(dayjs(value).toISOString())
						setIsOpen(false)
					}}
					disabled={disabled}
					initialFocus
				/>

				<div className="tw-flex tw-items-center tw-justify-between tw-border-t tw-p-2">
					<Button
						size="sm"
						variant="ghost"
						onClick={() => {
							onChange(null)
						}}
					>
						Clear
					</Button>
					<Button
						size="sm"
						onClick={() => {
							onChange(dayjs().toISOString())
						}}
					>
						Today
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
