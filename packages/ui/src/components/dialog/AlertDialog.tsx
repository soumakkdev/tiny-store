import { ReactNode } from 'react'
import { Button } from '../button/Button'
import { Dialog, DialogFooter, DialogHeader } from './Dialog'

export interface IAlertDialog {
	title: string
	body: ReactNode
	open: boolean
	onClose: () => void
	onConfirm?: () => void
	loading?: boolean
	danger?: boolean
}

export const AlertDialog = (props: IAlertDialog) => {
	const { open, onClose, onConfirm, title, body, loading, danger } = props
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogHeader title={title} />
			{body}
			<DialogFooter>
				<Button type="button" onClick={onClose} variant="secondary" className="tw-min-w-24" disabled={loading}>
					Cancel
				</Button>
				<Button type="button" variant={danger ? 'destructive' : 'default'} onClick={onConfirm} className="tw-min-w-24" loading={loading}>
					Confirm
				</Button>
			</DialogFooter>
		</Dialog>
	)
}
