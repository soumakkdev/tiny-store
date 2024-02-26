import Layout from '@/components/layout/Layout'
import ImageUploadField from '@/components/products/ImageUploadField'
import { useAddProduct } from '@/components/products/Products.query'
import { IProductImages, getProductImagesReqBody } from '@/components/products/Products.utils'
import useLoading from '@/hooks/useLoading'
import { useForm } from '@tanstack/react-form'
import { IAddProductReq } from '@tiny/types'
import { Button, Select, TextField } from '@tiny/ui'
import { useRouter } from 'next/router'
import { toInt } from 'radash'
import { useState } from 'react'
import toast from 'react-hot-toast'

enum ProductStatus {
	Active = 'active',
	Draft = 'draft',
}

const statusOptions = [
	{
		label: 'Active',
		value: ProductStatus.Active,
	},
	{
		label: 'Draft',
		value: ProductStatus.Draft,
	},
]

const categories = ['Electronics', 'Mobiles', 'Shoes', 'Fashion']

const categoriesOptions = categories?.map((c) => ({
	label: c,
	value: c,
}))

export default function AddProduct() {
	const { back, push } = useRouter()
	const { mutate: addProduct } = useAddProduct()
	const [productImages, setProductImages] = useState<IProductImages>(null)
	const { loading, startLoading, stopLoading } = useLoading()

	const { Provider, handleSubmit, Field } = useForm({
		defaultValues: {
			name: '',
			description: '',
			price: null,
			sku: '',
			status: 'draft',
			category: null,
		},
		onSubmit,
	})

	async function onSubmit({ value }: any) {
		startLoading()
		const images = await getProductImagesReqBody(productImages)
		const reqBody: IAddProductReq = {
			category: value?.category,
			description: value?.description,
			name: value?.name,
			price: value?.price,
			sku: value?.sku,
			status: value?.status,
			images,
		}
		addProduct(
			{
				body: reqBody,
			},
			{
				onSuccess: (data) => {
					push('/products')
					toast.success('Product added successfully')
				},
				onError: (err) => {
					toast.error('Something went wrong while added product. Please try again later')
				},
				onSettled: () => {
					stopLoading()
				},
			}
		)
	}

	return (
		<Layout title="Add Product" action={<></>}>
			<Provider>
				<div className="space-y-5">
					<div className="max-w-lg space-y-3 mt-8">
						<Field name="name">
							{(field) => (
								<TextField
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									label="Product Name"
								/>
							)}
						</Field>
						<Field name="description">
							{(field) => (
								<TextField
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									label="Description"
								/>
							)}
						</Field>
						<Field name="price">
							{(field) => (
								<TextField
									type="number"
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(toInt(e.target.value))}
									label="Price"
								/>
							)}
						</Field>
						<Field name="sku">
							{(field) => (
								<TextField
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									label="SKU"
								/>
							)}
						</Field>
						<Field name="status">
							{(field) => (
								<Select
									options={statusOptions}
									id={field.name}
									value={field.state.value}
									onChange={(selected) => field.handleChange(selected)}
									onBlur={field.handleBlur}
									label="Status"
								/>
							)}
						</Field>
						<Field name="category">
							{(field) => (
								<Select
									options={categoriesOptions}
									id={field.name}
									value={field.state.value}
									onChange={(selected) => field.handleChange(selected)}
									onBlur={field.handleBlur}
									label="Category"
								/>
							)}
						</Field>

						<ImageUploadField productImages={productImages} onChange={setProductImages} />

						<div className="flex gap-2">
							<Button onClick={back} variant="secondary" disabled={loading}>
								Cancel
							</Button>
							<Button type="button" onClick={() => handleSubmit()} loading={loading}>
								Confirm
							</Button>
						</div>
					</div>
				</div>
			</Provider>
		</Layout>
	)
}
