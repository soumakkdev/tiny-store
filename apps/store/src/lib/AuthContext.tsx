import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useContext } from 'react'
import { useState } from 'react'
import { ReactNode } from 'react'
import { createContext } from 'react'
import { auth } from './firebase'
import { useEffect } from 'react'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { ILoginParams } from '@tiny/types'

interface IAuthContext {
	user: User | null
	emailPasswordLogin: (params: ILoginParams) => void
	logout: () => void
	isLoading: boolean
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { replace } = useRouter()
	const [user, setUser] = useState<User | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			const token = await user?.getIdToken()
			setIsLoading(user === null)
			if (token) {
				setUser(user)
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

	const logout = async () => {
		await signOut(auth)
	}

	const contextValues = { user, emailPasswordLogin, logout, isLoading }
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
