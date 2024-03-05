import { User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useContext } from 'react'
import { useState } from 'react'
import { ReactNode } from 'react'
import { createContext } from 'react'
import { auth } from './firebase'
import { useEffect } from 'react'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { ILoginParams, ISignUpFormFields, ISignUpReqBody } from '@tiny/types'
import { fetchWithAuth, fetchWithoutAuth } from './fetch'

interface IAuthContext {
	user: User | null
	emailPasswordLogin: (params: ILoginParams) => void
	signup: (params: ISignUpFormFields) => void
	logout: () => void
	isLoading: boolean
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { replace } = useRouter()
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			const token = await firebaseUser?.getIdToken()
			setIsLoading(firebaseUser === null)
			if (token) {
				const user = await fetchWithAuth('GET', '/api/auth/user')
				setUser(user)
				console.log(user)
				nookies.set(undefined, 'token', token, { path: '/' })
			} else {
				setIsLoading(false)
				// replace('/login')
			}
		})
		return () => unsubscribe()
	}, [replace])

	const emailPasswordLogin = async (params: ILoginParams) => {
		await signInWithEmailAndPassword(auth, params.email, params.password)
	}

	const signup = async (params: ISignUpFormFields) => {
		const userCredentials = await createUserWithEmailAndPassword(auth, params.email, params.password)
		const reqBody: ISignUpReqBody = {
			email: params.email,
			name: params.name,
			phoneNo: params.phoneNo,
			uid: userCredentials.user.uid,
		}
		await fetchWithoutAuth('POST', '/api/auth/signup', reqBody)
	}

	const logout = async () => {
		await signOut(auth)
	}

	const contextValues = { user, emailPasswordLogin, logout, signup, isLoading }
	return (
		<AuthContext.Provider value={contextValues}>
			<AuthWrapper>{children}</AuthWrapper>
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)

function AuthWrapper({ children }: { children: ReactNode }) {
	const { isLoading } = useAuth()

	if (isLoading) {
		return <p>Loading...</p>
	}

	return <>{children}</>
}
