import { Button, Loader, ReactTable } from '@tiny/ui'
import Layout from '../../components/layout/Layout'
import Link from 'next/link'
import { useProducts } from '@/components/products/Products.query'

export default function Products() {
	const { data: products, isLoading } = useProducts()

	const columns = [
		{
			accessorKey: 'name',
			header: 'Name',
		},
		{
			accessorKey: 'status',
			header: 'Status',
		},
	]

	return (
		<Layout
			title="Products"
			action={
				<Link href="/products/add">
					<Button>Add Product</Button>
				</Link>
			}
		>
			{isLoading ? <Loader className="h-full grid place-content-center" /> : <ReactTable columns={columns} data={products} />}
		</Layout>
	)
}
