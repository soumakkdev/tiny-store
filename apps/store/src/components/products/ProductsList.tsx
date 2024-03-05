import { FullScreenLoader } from '@tiny/ui'
import ProductCard from './ProductCard'
import { useProducts } from './Products.query'

export default function ProductsList() {
	const { data: products, isLoading, isError } = useProducts()

	if (isLoading) return <FullScreenLoader />
	if (isError) return <p>Something went wrong. Try again</p>

	return (
		<div className="grid grid-cols-3 gap-5">
			{products?.map((product) => {
				return <ProductCard key={product.id} product={product} />
			})}
		</div>
	)
}
