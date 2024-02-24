import { cn } from '@/lib/utils'
import { Fragment, ReactNode } from 'react'
import {
	DropdownMenu as DropdownMenuBase,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export interface IMenuItem {
	title?: string
	onClick?: React.MouseEventHandler<HTMLDivElement>
	hidden?: boolean
	danger?: boolean
	icon?: ReactNode
	separator?: boolean
}

export interface IMenu {
	id?: string
	options: IMenuItem[]
	trigger: ReactNode
	header?: ReactNode
	triggerClassName?: string
}

export function DropdownMenu(props: IMenu) {
	const { trigger, options, header, id, triggerClassName } = props
	return (
		<DropdownMenuBase>
			<DropdownMenuTrigger id={id} className={triggerClassName} asChild>
				{trigger}
			</DropdownMenuTrigger>
			<DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()} sideOffset={8} collisionPadding={{ right: 4 }}>
				{header ? (
					<>
						<DropdownMenuLabel>{header}</DropdownMenuLabel>
						<DropdownMenuSeparator />
					</>
				) : null}

				{options
					?.filter((option) => !option?.hidden)
					?.map((option, idx) => {
						return (
							<Fragment key={idx}>
								<DropdownMenuItem
									id={option.title?.toLowerCase()?.replace(/ /g, '-')}
									onClick={option?.onClick}
									className={cn('tw-gap-3', { 'tw-text-red-600 focus:tw-text-red-600': option?.danger })}
								>
									{option?.icon}
									{option?.title}
								</DropdownMenuItem>

								{option?.separator ? <DropdownMenuSeparator /> : null}
							</Fragment>
						)
					})}
			</DropdownMenuContent>
		</DropdownMenuBase>
	)
}
