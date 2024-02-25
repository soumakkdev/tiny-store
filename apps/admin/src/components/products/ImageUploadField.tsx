import { IImage } from '@tiny/types'
import { Button } from '@tiny/ui'
import { UploadCloud, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { IProductImages } from './Products.utils'

export default function ImageUploadField(props: { productImages: IProductImages; onChange: any }) {
	const { onChange, productImages } = props
	const [previews, setPreviews] = useState<string[]>([])
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		productImages?.forEach((image) => {
			if ((image as IImage)?.public_id) {
				previewRemoteFile(image as IImage)
			} else {
				previewLocalFile(image as File)
			}
		})
	}, [productImages])

	function handleFileSelect(e) {
		const files = e.target.files
		if (files?.length) {
			const temp = productImages ?? []
			onChange((temp as any[])?.concat(Array.from(files)))

			Array.from(files).forEach((file: any) => {
				previewLocalFile(file)
			})
		} else {
			if (!previews?.length) {
				setPreviews([])
				onChange(null)
			}
		}
	}

	function previewRemoteFile(file: IImage) {
		const src = file?.url
		setPreviews((prevPreviews) => (!prevPreviews.includes(src) ? [...prevPreviews, src] : prevPreviews))
	}

	function previewLocalFile(file: File) {
		if (file) {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => {
				const src = reader.result as any
				setPreviews((prevPreviews) => (!prevPreviews.includes(src) ? [...prevPreviews, src] : prevPreviews))
			}
		}
	}

	function handleClearFile() {
		onChange(null)
		setPreviews([])
		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}

	function handleDeleteFile(index: number) {
		onChange(productImages?.filter((_, idx) => idx !== index))
		setPreviews((previews) => previews.filter((_, idx) => idx !== index))
	}

	return (
		<div>
			<input multiple ref={inputRef} type="file" hidden onChange={handleFileSelect} />
			<div className="flex gap-3 mb-4 items-center">
				<Button variant="outline" onClick={() => inputRef.current?.click()}>
					<UploadCloud className="h-5 w-5 text-foreground mr-2" />
					Upload Image
				</Button>

				{previews?.length ? (
					<Button variant="link" className="text-destructive" onClick={handleClearFile}>
						Clear All
					</Button>
				) : null}
			</div>

			{previews?.length ? (
				<div className="grid grid-cols-2 gap-4">
					{previews?.map((preview, idx) => (
						<div key={idx} className="relative">
							<div
								onClick={() => handleDeleteFile(idx)}
								className="absolute -top-2 -right-2 cursor-pointer hover:scale-125 transition-transform duration-100 h-6 w-6 bg-card shadow-lg grid place-content-center rounded-full "
							>
								<X className="h-4 w-4 text-destructive" />
							</div>
							<img src={preview} alt="preview" className="w-full" />
						</div>
					))}
				</div>
			) : null}
		</div>
	)
}
