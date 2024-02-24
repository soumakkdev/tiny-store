import Layout from '@/components/layout/Layout'
import { useAddProduct } from '@/components/products/Products.query'
import { Button, FormikField, Select, TextField } from '@tiny/ui'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/router'

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

const categories = ['Lifestyle', 'Jordan', 'Running', 'Basketball', 'Football', 'Gym', 'Skateboarding', 'Golf', 'Tennis', 'Athletics', 'Walking']

const categoriesOptions = categories?.map((c) => ({
	label: c,
	value: c,
}))

export default function AddProduct() {
	const { back } = useRouter()
	const { mutate: addProduct } = useAddProduct()

	const formik = useFormik({
		initialValues: { name: '', description: '', variants: [{}] },
		onSubmit,
	})

	function onSubmit(values: any) {
		console.log(values)
		addProduct(
			{
				body: values,
			},
			{
				onSuccess: (data) => {
					console.log(data)
				},
				onError: (err) => {
					console.log(err)
				},
			}
		)
	}

	return (
		<Layout
			title="Add Product"
			action={
				<>
					<Button onClick={back} variant="secondary">
						Cancel
					</Button>
					<Button onClick={() => formik.handleSubmit()}>Confirm</Button>
				</>
			}
		>
			<FormikProvider value={formik}>
				<div className="space-y-4">
					<div className="max-w-lg mx-auto space-y-3 bg-surface2 p-5 rounded-lg border">
						<FormikField name="name">
							<TextField label="Product Name" />
						</FormikField>
						<FormikField name="description">
							<TextField label="Description" />
						</FormikField>
						<FormikField name="status">
							{({ value, onChange }) => <Select label="Status" options={statusOptions} value={value} onChange={onChange} />}
						</FormikField>
						<FormikField name="category">
							{({ value, onChange }) => <Select label="Category" options={categoriesOptions} value={value} onChange={onChange} />}
						</FormikField>
					</div>
				</div>
			</FormikProvider>
		</Layout>
	)
}
