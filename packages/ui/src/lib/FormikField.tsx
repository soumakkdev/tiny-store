import { useField, FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik'
import React, { ReactElement } from 'react'

type RenderProps = (field: FieldInputProps<any>, meta: FieldMetaProps<any>, helpers: FieldHelperProps<any>) => void

interface IField {
	children?: RenderProps | ReactElement
	name: string
	required?: boolean
	defaultValue?: string | number | readonly string[]
	checkbox?: boolean
}

export const FormikField = (props: IField) => {
	const { children, name, required, defaultValue, checkbox } = props
	const [field, meta, helpers] = useField({
		name,
		required,
		defaultValue,
	})

	const fieldProps = {
		...field,
		id: name,
		value: field?.value ?? '',
		error: (meta.touched && meta.error) || undefined,
	}

	if (checkbox) {
		fieldProps.checked = !!field?.value
	}

	if (typeof children === 'function') {
		return <>{children(field, meta, helpers)}</>
	} else {
		const childrenWithProps = React.Children.map(children, (child) => {
			if (React.isValidElement(child)) {
				return React.cloneElement(child, fieldProps)
			}
			return child
		})
		return <>{childrenWithProps}</>
	}
}
