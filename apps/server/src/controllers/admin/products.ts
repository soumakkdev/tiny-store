import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { IAddProductReq, IProductQueries } from '@tiny/types'
import { isEmpty, toInt } from 'radash'
import { uploadImages } from '../../lib/image'
import { db } from '../../db/db'
import { sql } from 'drizzle-orm'
import { productsTable } from '../../db/schema'

export async function getProducts(req: Request, res: Response, next: NextFunction) {
	try {
		const { pageNo, category, pageSize, search } = req.query as IProductQueries
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
				return next(createHttpError.InternalServerError('Error while uploading product images'))
			}
		}

		const newProduct = await db.insert(productsTable).values(reqBody)
		res.json({ data: newProduct })
	} catch (error: any) {
		next(createHttpError.InternalServerError(error.message || 'Error adding product'))
	}
}
export function editProduct() {}
export function deleteProduct() {}
