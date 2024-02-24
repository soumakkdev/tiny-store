import { cn } from '@/lib/utils'
import { Label } from '../ui/label'
import { RadioGroupItem, RadioGroupProps, RadioGroup as RadioGroupBase } from '../ui/radio-group'
import { IOption } from '@/lib/types'

export interface IRadioGroup extends Omit<RadioGroupProps, 'onChange'> {
	onChange: (value: string) => void
	options: IOption[]
	selected: string
	direction?: 'col' | 'row'
}

export function RadioGroup(props: IRadioGroup) {
	const { onChange, options, selected, direction = 'col', className, ...rest } = props
	return (
		<RadioGroupBase
			value={selected}
			onValueChange={onChange}
			className={cn(className, direction === 'row' ? 'tw-flex-row' : 'tw-flex-col')}
			{...rest}
		>
			{options?.map((option, idx) => {
				return (
					<div className="tw-flex tw-items-center tw-space-x-2" key={idx}>
						<RadioGroupItem id={option.value?.toString()} value={option.value} />
						<Label htmlFor={option.value?.toString()}>{option.label}</Label>
					</div>
				)
			})}
		</RadioGroupBase>
	)
}
