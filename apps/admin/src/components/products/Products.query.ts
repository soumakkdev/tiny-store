import { fetchWithAuth } from '@/lib/fetch'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useProducts = () => {
	return useQuery(['products'], () => fetchWithAuth('GET', '/api/admin/products'), {
		select: (data) => data.data,
	})
}

export const useAddProduct = () => {
	const queryClient = useQueryClient()
	return useMutation(({ body }: { body: any }) => fetchWithAuth('POST', '/api/admin/products', body), {
		onSuccess: () => {
			queryClient.invalidateQueries(['products'])
		},
	})
}
