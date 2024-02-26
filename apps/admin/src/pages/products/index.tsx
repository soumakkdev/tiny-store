import { useProducts } from '@/components/products/Products.query'
import { Button, ReactTable, TextInput } from '@tiny/ui'
import Link from 'next/link'
import Layout from '../../components/layout/Layout'

export default function Products() {
	const { data: products, isLoading } = useProducts({ pageNo: 1, category: 'shoes' })

	const columns = [
		{
			accessorKey: 'name',
			header: 'Name',
		},
		{
			accessorKey: 'category',
			header: 'Category',
		},
		{
			accessorKey: 'price',
			header: 'Price',
		},
		{
			accessorKey: 'sku',
			header: 'SKU',
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
			<div className="pb-4 flex gap-3">
				<TextInput placeholder="Search for products" />
				<Button variant="secondary">Category</Button>
				<Button variant="secondary">Sort</Button>
			</div>
			<ReactTable columns={columns} data={products} isLoading={isLoading} />
		</Layout>
	)
}
