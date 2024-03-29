import React from 'react'
import { TextInput, TextInputProps } from './TextInput'
import { Label } from '../ui/label'

interface ITextField extends TextInputProps {
	label?: string
	error?: string
}

export function TextField(props: ITextField) {
	const { label, id, error, ...rest } = props
	return (
		<div className="space-y-1">
			{label ? <Label htmlFor={id}>{label}</Label> : null}
			<TextInput id={id} {...rest} />
			{error ? <p className="text-xs text-destructive">{error}</p> : null}
		</div>
	)
}
