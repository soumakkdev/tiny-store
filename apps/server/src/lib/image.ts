import { IImage } from '@tiny/types'
import { isEmpty } from 'radash'
import cloudinary from './cloudinary'

export async function uploadImages(images: IImage[], folder: string): Promise<IImage[]> {
	const imagesToUpload = images?.filter((img) => isEmpty(img?.public_id)) ?? []
	const alreadyUploadedImages = images?.filter((img) => !isEmpty(img?.public_id)) ?? []

	const imagesData: IImage[] = []
	for (const img of imagesToUpload) {
		if (img?.url) {
			const data = await cloudinary.uploader.upload(img.url, { folder })
			imagesData.push({
				public_id: data.public_id,
				url: data.secure_url,
			})
		}
	}

	return alreadyUploadedImages.concat(imagesData)
}
