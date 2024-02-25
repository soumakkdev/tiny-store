import { SelectContent, SelectGroup, SelectItem, Select as SelectBase, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import { IOption } from '@/lib/types'

export interface ISelect {
	value?: string
	onChange?: (value?: string) => void
	onBlur?: () => void
	disabled?: boolean
	options: IOption[]
	size?: 'sm' | 'md' | 'lg'
	id?: string
	placeholder?: string
	className?: string
	label?: string
}

export function Select(props: ISelect) {
	const { value, onChange, label, disabled, options, size, id, placeholder, className, onBlur } = props
	return (
		<div className="tw-space-y-1">
			{label ? <Label htmlFor={id}>{label}</Label> : null}

			<SelectBase value={value ?? undefined} onValueChange={(selected) => onChange?.(selected)}>
				<SelectTrigger
					id={id}
					disabled={disabled}
					onBlur={onBlur}
					className={cn(
						'tw-w-full',
						{
							'tw-h-8': size === 'sm',
							'tw-h-9': size === 'md',
							'tw-h-10': size === 'lg',
						},
						className
					)}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						{options?.map((option, idx) => (
							<SelectItem key={idx} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</SelectBase>
		</div>
	)
}
