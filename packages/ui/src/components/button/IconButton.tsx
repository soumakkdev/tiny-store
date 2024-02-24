import { cn } from '@/lib/utils'
import { VariantProps, cva } from 'class-variance-authority'
import React, { ReactNode } from 'react'

const buttonVariants = cva(
	'tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50',
	{
		variants: {
			variant: {
				default: 'tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground',
				secondary: 'tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80',
				ghost: 'hover:tw-bg-accent hover:tw-text-accent-foreground',
			},
			size: {
				default: 'tw-h-8 tw-w-8',
				sm: 'tw-h-7 tw-w-7 tw-rounded-md',
				lg: 'tw-h-10 tw-w-10 tw-rounded-md',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	icon: ReactNode
}

export default function IconButton(props: IconButtonProps) {
	const { icon, className, variant, size, ...rest } = props
	return (
		<button className={cn(buttonVariants({ variant, size, className }))} {...rest}>
			{icon}
		</button>
	)
}
