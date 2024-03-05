import { ISignUpReqBody } from '@tiny/types'
import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { db } from '../../db/db'
import { users } from '../../db/schema'
import { sql } from 'drizzle-orm'
import { RequestWithUId } from '../../middlewares/verifyAuth'

export async function signup(req: Request, res: Response, next: NextFunction) {
	try {
		const { uid, name, email, phoneNo } = req.body as ISignUpReqBody
		const data = await db.insert(users).values({ name, email, phoneNo, uid })
		res.json({ data })
	} catch (error: any) {
		next(createHttpError.InternalServerError(error.message || 'Signup failed'))
	}
}

export async function getAuthUser(req: RequestWithUId, res: Response, next: NextFunction) {
	try {
		const data = await db
			.select()
			.from(users)
			.where(sql`${users.uid} = ${req.uid}`)
		res.json({ data: data[0] })
	} catch (error: any) {
		next(createHttpError.InternalServerError(error.message || 'Signup failed'))
	}
}
