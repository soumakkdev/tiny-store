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
		<div className="tw-flex tw-items-center tw-space-x-2">
			<CheckboxBase id={id} onCheckedChange={onChange} {...rest} />
			{label ? (
				<Label
					htmlFor={id}
					className="tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
				>
					{label}
				</Label>
			) : null}
		</div>
	)
}
