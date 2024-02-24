import { Label } from '../ui/label'
import { SwitchProps, Switch as SwitchBase } from '../ui/switch'

export interface ISwitch extends Omit<SwitchProps, 'onChange'> {
	label: string
	id: string
	onChange?: (value: boolean) => void
}

export function Switch(props: ISwitch) {
	const { label, id, onChange, ...rest } = props
	return (
		<div className="tw-flex tw-items-center tw-space-x-2">
			<SwitchBase id={id} onCheckedChange={onChange} {...rest} />
			<Label htmlFor={id} className="tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70">
				{label}
			</Label>
		</div>
	)
}
