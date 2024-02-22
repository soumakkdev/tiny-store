import { CheckboxProps, Checkbox as CheckboxBase } from '../ui/checkbox'
import { Label } from '../ui/label'

export interface ICheckbox extends Omit<CheckboxProps, 'onChange'> {
	label?: string
	id?: string
	onChange?: (value: boolean) => void
}

export function Checkbox(props: ICheckbox) {
	const { label, id, onChange, ...rest } = props
	return (
		<div className="flex items-center space-x-2">
			<CheckboxBase id={id} onCheckedChange={onChange} {...rest} />
			{label ? (
				<Label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
					{label}
				</Label>
			) : null}
		</div>
	)
}
