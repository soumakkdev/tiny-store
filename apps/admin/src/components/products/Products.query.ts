import { fetchWithAuth } from '@/lib/fetch'
import { IAddProductReq } from '@tiny/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useProducts = () => {
	return useQuery(['products'], () => fetchWithAuth('GET', '/api/admin/products'), {
		select: (data) => data.data,
	})
}

export const useAddProduct = () => {
	const queryClient = useQueryClient()
	return useMutation(({ body }: { body: IAddProductReq }) => fetchWithAuth('POST', '/api/admin/products', body), {
		onSuccess: () => {
			queryClient.invalidateQueries(['products'])
		},
	})
}
