import Header from '@/components/layout/Header'
import ProductsList from '@/components/products/ProductsList'
import React from 'react'

export default function ProductsPage() {
	return (
		<section className="container">
			<Header />
			<ProductsList />
		</section>
	)
}
