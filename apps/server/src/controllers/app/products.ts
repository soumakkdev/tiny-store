import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import prisma from '../../lib/prisma'
import { toInt } from 'radash'

export async function getProducts(req: Request, res: Response, next: NextFunction) {
	try {
		const products = await prisma.product.findMany({})
		res.json({ data: products })
	} catch (error: any) {
		next(createHttpError.InternalServerError(error.message || 'Error fetching products'))
	}
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
	try {
		const productId = toInt(req.params.productId)
		if (productId) {
			const product = await prisma.product.findUnique({
				where: {
					id: productId,
				},
			})

			res.json({ data: product })
		} else {
			throw new Error('Invalid product id ')
		}
	} catch (error: any) {
		next(createHttpError.InternalServerError(error.message || 'Error fetching product'))
	}
}
