import { formatCurrency } from '@/lib/helpers'
import { Button } from '@tiny/ui'
import { useRouter } from 'next/router'
import useCart from '../cart/useCart'
import { useProductDetails } from './Products.query'

interface IProductDetailsQuery {
	productId: string
}

export default function ProductDetails() {
	const { query } = useRouter()
	const { productId } = query as unknown as IProductDetailsQuery
	const { data: product, isLoading } = useProductDetails(productId)
	const { addItemToCart } = useCart()

	if (isLoading) return <p>Loading...</p>

	return (
		<div className="grid grid-cols-5 gap-8">
			<figure className="col-span-3 px-20">
				<img src={product?.images?.[0]?.url} alt="" className="rounded-md" />
			</figure>

			<article className="col-span-2 px-8">
				<h3 className="font-medium text-2xl mb-2">{product?.name}</h3>
				<p className="space-x-2 font-medium text-base mb-4">
					<span>MRP</span>
					<span>{formatCurrency(product.price)}</span>
				</p>

				<div className="flex gap-4 mb-8">
					<Button className="rounded-full w-full" size="lg" onClick={() => addItemToCart(product)}>
						Add to Bag
					</Button>
					<Button variant="outline" className="rounded-full w-full" size="lg">
						Add to Favorite
					</Button>
				</div>

				<p>{product?.description}</p>
			</article>
		</div>
	)
}
