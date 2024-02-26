import { NextFunction, Request, Response } from 'express'
import prisma from '../../lib/prisma'
import createHttpError from 'http-errors'
import { IAddProductReq, IProductQueries } from '@tiny/types'
import { isEmpty, toInt } from 'radash'
import { uploadImages } from '../../lib/image'

export async function getProducts(req: Request, res: Response, next: NextFunction) {
	try {
		const { pageNo, category, pageSize, search } = req.query as IProductQueries
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
		const reqBody: any = {
			name,
			status,
			description,
			price,
			sku,
			category,
		}

		if (!isEmpty(images)) {
			try {
				reqBody.images = await uploadImages(images, `products/${category}`)
			} catch (error) {
				console.log(error)
				return next(createHttpError.InternalServerError('Error while uploading product images'))
			}
		}

		const newProduct = await prisma.product.create({
			data: reqBody,
		})

		res.json({ data: newProduct })
	} catch (error: any) {
		next(createHttpError.InternalServerError(error.message || 'Error adding product'))
	}
}
export function editProduct() {}
export function deleteProduct() {}
