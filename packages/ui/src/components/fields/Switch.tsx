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
		<div className="flex items-center space-x-2">
			<SwitchBase id={id} onCheckedChange={onChange} {...rest} />
			<Label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
				{label}
			</Label>
		</div>
	)
}
