import { cn } from '@/lib/utils'
import { TooltipArrow, Tooltip as TooltipBase, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

export interface ITooltip {
	children: React.ReactNode
	delay?: number
}

export function Tooltip(props: ITooltip) {
	const { children, delay = 200 } = props
	return (
		<TooltipProvider delayDuration={delay}>
			<TooltipBase>{children}</TooltipBase>
		</TooltipProvider>
	)
}

interface ITooltipTrigger {
	children: React.ReactNode
	className?: string
	disabled?: boolean
}

Tooltip.Trigger = (props: ITooltipTrigger) => {
	const { children, className, disabled } = props
	return (
		<TooltipTrigger asChild disabled={disabled} className={cn(className, 'disabled:tw-opacity-60')} type="button">
			{children}
		</TooltipTrigger>
	)
}

interface ITooltipContent {
	children: React.ReactNode
	className?: string
	arrowClassName?: string
	arrow?: boolean
}

Tooltip.Content = (props: ITooltipContent) => {
	const { children, className, arrow, arrowClassName } = props
	return (
		<TooltipContent className={className}>
			{arrow ? <TooltipArrow className={cn('tw-fill-slate-900', arrowClassName)} /> : null}
			{children}
		</TooltipContent>
	)
}
