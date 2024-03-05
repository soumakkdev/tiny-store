import { Button, Checkbox, FormikField, TextInput } from '@tiny/ui'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/router'
import { tryit } from 'radash'
import toast from 'react-hot-toast'
import useLoading from '../hooks/useLoading'
import { useAuth } from '../lib/AuthContext'
import { ILoginParams } from '../types/auth'

export default function Login() {
	const { replace } = useRouter()
	const { loading, startLoading, stopLoading } = useLoading()
	const { emailPasswordLogin } = useAuth()
	const formik = useFormik({
		initialValues: {
			email: 'admin@tiny.com',
			password: 'tiny@admin',
		},
		onSubmit,
	})

	async function onSubmit(values: ILoginParams) {
		startLoading()
		const [err, res] = await tryit(emailPasswordLogin)(values)
		stopLoading()

		if (err) {
			// TODO: getting firebase error codes, need to send readable error messages
			return toast.error(err.message)
		}

		replace('/')
	}

	return (
		<FormikProvider value={formik}>
			<div className="h-full flex items-center justify-center">
				<div className="max-w-sm flex-1 mx-auto px-3">
					<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to admin dashboard</h2>

					<form className="space-y-4 mt-8" onSubmit={formik.handleSubmit}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Email address
							</label>
							<div className="mt-2">
								<FormikField name="email">
									<TextInput id="email" type="email" size="lg" autoComplete="email" required />
								</FormikField>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
								Password
							</label>
							<div className="mt-2">
								<FormikField name="password">
									<TextInput id="password" size="lg" type="password" autoComplete="current-password" required />
								</FormikField>
							</div>
						</div>

						<Checkbox label="Remember me" />

						<div>
							<Button type="submit" size="lg" loading={loading} variant="default" className="w-full">
								{loading ? 'Hold on' : 'Sign in'}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</FormikProvider>
	)
}
