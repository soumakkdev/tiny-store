import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	size?: 'sm' | 'md' | 'lg'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, size, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				{
					'h-8 px-2': size === 'sm',
					'h-9 px-3': size === 'md',
					'h-10 px-3': size === 'lg',
				},
				className
			)}
			ref={ref}
			{...props}
		/>
	)
})
Input.displayName = 'Input'

export { Input }
