import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { toInt } from 'radash'
import { db } from '../../db/db'
import { productsTable } from '../../db/schema'
import { sql } from 'drizzle-orm'

export async function getProducts(req: Request, res: Response, next: NextFunction) {
	try {
		const data = await db.select().from(productsTable)
		res.json({ data })
	} catch (error: any) {
		next(createHttpError.InternalServerError(error.message || 'Error fetching products'))
	}
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
	try {
		const productId = toInt(req.params.productId)
		if (productId) {
			const data = await db
				.select()
				.from(productsTable)
				.where(sql`${productsTable.id} = ${productId}`)

			res.json({ data })
		} else {
			throw new Error('Invalid product id ')
		}
	} catch (error: any) {
		next(createHttpError.InternalServerError(error.message || 'Error fetching product'))
	}
}
