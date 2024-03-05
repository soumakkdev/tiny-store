import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { auth } from '../lib/firebase'

export async function verifyAdminAuth(req: Request, res: Response, next: NextFunction) {
	try {
		const authorization = req.headers.authorization
		const token = authorization?.split('Bearer ')[1]

		if (token) {
			const user = await auth.verifyIdToken(token)
			const uid = user.uid
			next()
		} else {
			throw new Error('No token found')
		}
	} catch (error: any) {
		next(createHttpError.Unauthorized(error?.message ?? 'Unauthorized'))
	}
}

export interface RequestWithUId extends Request {
	uid?: string
}

export async function verifyUserAuth(req: RequestWithUId, res: Response, next: NextFunction) {
	try {
		const authorization = req.headers.authorization
		const token = authorization?.split('Bearer ')[1]

		if (token) {
			const user = await auth.verifyIdToken(token)
			req.uid = user.uid
			next()
		} else {
			throw new Error('No token found')
		}
	} catch (error) {
		next(createHttpError.InternalServerError())
	}
}
