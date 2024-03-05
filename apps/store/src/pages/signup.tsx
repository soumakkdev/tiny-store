import useLoading from '@/hooks/useLoading'
import { useAuth } from '@/lib/AuthContext'
import { ISignUpFormFields } from '@tiny/types'
import { Button, FormikField, TextField } from '@tiny/ui'
import { FormikProvider, useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { tryit } from 'radash'
import toast from 'react-hot-toast'

export default function SignupPage() {
	const { replace } = useRouter()
	const { loading, startLoading, stopLoading } = useLoading()
	const { signup } = useAuth()

	const formik = useFormik({
		initialValues: {
			email: 'soumak@tiny.com',
			password: 'tiny@soumak',
		},
		onSubmit,
	})

	async function onSubmit(values: ISignUpFormFields) {
		startLoading()
		const [err, res] = await tryit(signup)(values)
		stopLoading()

		if (err) {
			// TODO: getting firebase error codes, need to send readable error messages
			return toast.error(err.message)
		}

		toast.success('Signup successful')
		replace('/login')
	}

	return (
		<div className="grid place-content-center h-full">
			<FormikProvider value={formik}>
				<form className="max-w-md mx-auto px-4" onSubmit={formik.handleSubmit}>
					<div className="space-y-4">
						<h1 className="text-2xl font-semibold">Sign Up</h1>
						<FormikField name="name">
							<TextField id="name" label="Name" size="lg" />
						</FormikField>
						<FormikField name="phone">
							<TextField id="phone" label="Phone No" size="lg" />
						</FormikField>
						<FormikField name="email">
							<TextField id="email" label="Email Id" size="lg" />
						</FormikField>
						<FormikField name="password">
							<TextField id="password" label="Password" type="password" size="lg" />
						</FormikField>
						<p className="text-sm">By continuing, I agree to Privacy Policy and Terms of Use.</p>
						<Button loading={loading} className="rounded-full w-full" size="lg" type="submit">
							{loading ? 'Hold on' : 'Sign up'}
						</Button>
						<p className="text-sm text-center">
							Already have an account?{' '}
							<Link href="/login" className="underline">
								Login
							</Link>
						</p>
					</div>
				</form>
			</FormikProvider>
		</div>
	)
}
