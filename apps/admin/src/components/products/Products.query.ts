import { fetchWithAuth } from '@/lib/fetch'
import { IAddProductReq, IProductQueries } from '@tiny/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useProducts = (queries?: IProductQueries) => {
	const searchParams = new URLSearchParams()
	Object.entries(queries ?? {}).forEach(([key, value]) => {
		searchParams.append(key, value)
	})
	const url = `/api/admin/products${searchParams.size ? `?${searchParams?.toString()}` : ''}`
	return useQuery(['products'], () => fetchWithAuth('GET', url), {
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
