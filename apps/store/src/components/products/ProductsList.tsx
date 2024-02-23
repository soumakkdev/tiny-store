import React from 'react'
import { useProducts } from './Products.query'
import ProductCard from './ProductCard'

export default function ProductsList() {
	const { data: products, isLoading, isError } = useProducts()

	if (isLoading) return <p>Loading...</p>
	if (isError) return <p>Something went wrong. Try again</p>

	return (
		<div className="grid grid-cols-3 gap-5">
			{products?.map((product) => {
				return <ProductCard key={product.id} product={product} />
			})}
		</div>
	)
}
