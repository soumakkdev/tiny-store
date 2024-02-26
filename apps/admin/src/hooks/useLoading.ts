import { useState } from 'react'

export default function useLoading() {
	const [loading, setLoading] = useState(false)

	function startLoading() {
		setLoading(true)
		document.body.style.cursor = 'wait'
	}

	function stopLoading() {
		setLoading(false)
		document.body.style.cursor = 'default'
	}
	return {
		loading,
		startLoading,
		stopLoading,
	}
}
