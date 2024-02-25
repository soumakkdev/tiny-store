import { IImage } from '@tiny/types'

export type IProductImages = File[] | IImage[] | null

function getBase64ImageFromFile(file: File): Promise<string> {
	const reader = new FileReader()
	reader.readAsDataURL(file)

	return new Promise((resolve, reject) => {
		reader.onload = () => {
			resolve(reader.result as any)
		}
		reader.onerror = (err) => {
			reject(err)
		}
	})
}

export async function getProductImagesReqBody(productImages: IProductImages) {
	const images: IImage[] = []
	if (productImages && Object.keys(productImages).length) {
		for (const img of productImages) {
			if ((img as IImage)?.public_id) {
				images.push(img as IImage)
			} else {
				const src = await getBase64ImageFromFile(img as File)
				images.push({
					url: src,
				})
			}
		}
	}
	return images
}
