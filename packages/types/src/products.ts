import z from 'zod'

export const ZImage = z.object({
	public_id: z.string().nullable().optional(),
	url: z.string(),
})

export const ZAddProductReq = z.object({
	name: z.string(),
	description: z.string().optional().nullable(),
	category: z.string().optional().nullable(),
	status: z.string(),
	price: z.number(),
	images: ZImage.array(),
	sku: z.string(),
})
export type IAddProductReq = z.infer<typeof ZAddProductReq>

export const ZProduct = ZAddProductReq.extend({
	id: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
})
export type IProduct = z.infer<typeof ZProduct>

export const ZOrderItem = z.object({
	id: z.number(),
	productId: z.number(),
	orderId: z.number().optional().nullable(),
	name: z.string(),
	description: z.string().optional().nullable(),
	category: z.string().optional().nullable(),
	status: z.string(),
	price: z.number(),
	quantity: z.number(),
	sku: z.string(),
	images: ZImage.array(),
})
export type IOrderItem = z.infer<typeof ZOrderItem>
