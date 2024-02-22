import { Prisma } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

const errorHandler = (err: Error | any, req: Request, res: Response, next: NextFunction) => {
	console.error('[ERROR] ', err)
	// logger.error('[ERROR]', err)

	const statusCode = err.status ?? err.statusCode ?? 500
	const name = err.name ?? 'ServerError'
	const message = err.message ?? 'Internal Server Error'

	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		res.status(400).json({ error: 'PrismaError', message: 'Bad Request', success: false })
	} else {
		res.status(statusCode).json({ error: name, message: message, success: false })
	}
}

export default errorHandler
