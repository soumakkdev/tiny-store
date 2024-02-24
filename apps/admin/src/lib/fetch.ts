import nookies from 'nookies'

export async function fetchWithAuth(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: object) {
	try {
		const cookies = nookies.get(undefined, 'token')

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
		}

		if (cookies?.token) {
			headers.Authorization = `Bearer ${cookies.token}`
		}

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
			method,
			body: JSON.stringify(body),
			headers,
		})

		const data = await res.json()
		if (!res?.ok) {
			throw new Error(data?.message)
		}
		return data
	} catch (error) {
		throw error
	}
}
