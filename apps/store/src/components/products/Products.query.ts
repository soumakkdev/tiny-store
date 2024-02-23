import { fetchWithAuth } from '@/lib/fetch'
import { IProduct } from '@tiny/types'
import { useQuery } from '@tanstack/react-query'

export const useProducts = () => {
	return useQuery(['products'], () => fetchWithAuth('GET', '/api/products'), {
		select: (data) => data.data as IProduct[],
	})
}

export const useProductDetails = (productId?: string) => {
	return useQuery(['products', productId], () => fetchWithAuth('GET', `/api/products/${productId}`), {
		select: (data) => data.data as IProduct,
	})
}
