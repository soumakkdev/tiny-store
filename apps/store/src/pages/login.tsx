import TextField from '@/components/shared/fields/TextField'
import useLoading from '@/hooks/useLoading'
import { useAuth } from '@/lib/AuthContext'
import { Button, FormikField } from '@tiny/ui'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/router'
import { tryit } from 'radash'
import toast from 'react-hot-toast'

export default function LoginPage() {
	const { replace } = useRouter()
	const { loading, startLoading, stopLoading } = useLoading()
	const { emailPasswordLogin } = useAuth()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit,
	})

	async function onSubmit(values: any) {
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
		<div className="grid place-content-center h-full">
			<FormikProvider value={formik}>
				<form className="max-w-md mx-auto px-4" onSubmit={formik.handleSubmit}>
					<div className="space-y-4">
						<h1 className="text-2xl font-semibold">Sign In</h1>
						<FormikField name="email">
							<TextField id="email" label="Email" size="lg" />
						</FormikField>
						<FormikField name="password">
							<TextField id="password" label="Password" type="password" size="lg" />
						</FormikField>
						<p className="text-sm">By continuing, I agree to Privacy Policy and Terms of Use.</p>
						<Button loading={loading} className="rounded-full w-full" size="lg" type="submit">
							{loading ? 'Hold on' : 'Sign in'}
						</Button>
					</div>
				</form>
			</FormikProvider>
		</div>
	)
}
