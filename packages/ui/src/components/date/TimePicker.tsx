import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { ClockIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '../button/Button'

dayjs.extend(LocalizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

interface ITimePicker {
	id?: string
	value: string
	onChange: (date: string | null) => void
	disabled?: boolean
	timezone?: string
}

const hours = Array.from({ length: 24 }, (_, index) => index)
const minutes = Array.from({ length: 60 }, (_, index) => index)

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export function TimePicker(props: ITimePicker) {
	const { value, onChange, timezone, id } = props
	const [hour, setHour] = useState<number | null>(null)
	const [minute, setMinute] = useState<number | null>(null)
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (value) {
			setHour(dayjs(value).hour())
			setMinute(dayjs(value).minute())
		}
	}, [value])

	useEffect(() => {
		if (hour !== null && minute !== null) {
			const date = dayjs().hour(hour).minute(minute)
			onChange(date.toISOString())
		} else {
			onChange(null)
		}
		// eslint-disable-next-line
	}, [hour, minute])

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild id={id}>
				<Button variant="outline" type="button">
					{value && hour !== null && minute !== null ? (
						dayjs(value)
							.local()
							.tz(timezone || userTimezone)
							.format('HH:mm')
					) : (
						<span>Pick a time</span>
					)}
					<ClockIcon className="ml-auto h-4 w-4 opacity-80" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-auto p-0" align="start">
				<div className="w-auto divide-x py-2 flex items-start h-52">
					<div className="h-full overflow-auto px-2">
						{hours?.map((h) => (
							<div
								id={`h-${h}`}
								onClick={(e: any) => {
									if (e.target?.id) {
										document.getElementById(e.target?.id)?.scrollIntoView({ behavior: 'smooth' })
										setHour(h)
									}
								}}
								className={cn('p-1 px-3 rounded-md cursor-pointer hover:bg-muted', {
									'bg-primary-light hover:bg-primary-light': hour === h,
								})}
							>
								{String(h).padStart(2, '0')}
							</div>
						))}
					</div>

					<div className="h-full overflow-auto px-2">
						{minutes?.map((m) => (
							<div
								id={`m-${m}`}
								onClick={(e: any) => {
									if (e.target?.id) {
										document.getElementById(e.target?.id)?.scrollIntoView({ behavior: 'smooth' })
										setMinute(m)
									}
								}}
								className={cn('p-1 px-3 rounded-md cursor-pointer hover:bg-muted', {
									'bg-primary-light hover:bg-primary-light': minute === m,
								})}
							>
								{String(m).padStart(2, '0')}
							</div>
						))}
					</div>
				</div>

				<div className="flex items-center justify-between border-t p-2">
					<Button
						size="sm"
						variant="ghost"
						onClick={() => {
							setHour(null)
							setMinute(null)
						}}
					>
						Clear
					</Button>
					<Button
						size="sm"
						onClick={() => {
							setHour(dayjs().hour())
							setMinute(dayjs().minute())
						}}
					>
						Now
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
