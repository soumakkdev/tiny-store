import React from 'react'
import { Button as ButtonBase, ButtonProps as ButtonBaseProps } from '../ui/button'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends ButtonBaseProps {
	loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { children, loading, disabled, ...rest } = props
	return (
		<ButtonBase ref={ref} disabled={disabled || loading} {...rest}>
			{loading ? <Loader2 className="tw-animate-spin mr-2" /> : null} {children}
		</ButtonBase>
	)
})
