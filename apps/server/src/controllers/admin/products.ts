import { NextFunction, Request, Response } from 'express'
import prisma from '../../lib/prisma'
import createHttpError from 'http-errors'
import { IAddProductReq } from '@repo/types'
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
			const products = await prisma.product.findFirst({
				where: {
					id: productId,
				},
			})
			res.json({ data: products })
		} else {
			throw new Error('Invalid product id')
		}
	} catch (error: any) {
		next(createHttpError.InternalServerError(error.message || 'Error fetching products'))
	}
}

export async function addProduct(req: Request, res: Response, next: NextFunction) {
	const { name, status, description, images, price, sku, category } = req.body as IAddProductReq
	try {
		const newProduct = await prisma.product.create({
			data: {
				name,
				status,
				description,
				images,
				price,
				sku,
				category,
			},
		})

		res.json({ data: newProduct })
	} catch (error: any) {
		next(createHttpError.InternalServerError(error.message || 'Error adding product'))
	}
}
export function editProduct() {}
export function deleteProduct() {}
