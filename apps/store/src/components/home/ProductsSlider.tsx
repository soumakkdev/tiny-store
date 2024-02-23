import { IProduct } from '@tiny/types'
import { useKeenSlider } from 'keen-slider/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { isEmpty } from 'radash'
import { useState } from 'react'

export default function ProductsSlider({ products }: { products: IProduct[] }) {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)

	const [sliderRef, instanceRef] = useKeenSlider({
		initial: 0,
		drag: true,
		loop: false,
		breakpoints: {
			'(min-width: 400px)': {
				slides: { perView: 2, spacing: 10 },
			},
			'(min-width: 600px)': {
				slides: { perView: 3, spacing: 10 },
			},
			'(min-width: 1000px)': {
				slides: { perView: 4, spacing: 10 },
			},
		},
		slides: { perView: 2, spacing: 10 },
		animationEnded(s) {
			setCurrentSlide(s.track.details.rel)
		},
		created() {
			setLoaded(true)
		},
	})

	const isActive = loaded && !isEmpty(instanceRef.current)
	const totalSlides = instanceRef?.current?.track?.details?.slides?.length ?? 0
	const slidePerView = (instanceRef?.current?.options?.slides as any)?.perView ?? 0

	// useEffect(() => {
	// 	instanceRef.current?.update()
	// }, [instanceRef, loaded])

	return (
		<div className="relative">
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-2xl font-semibold">Trending Products</h2>

				<div className="flex items-center gap-3">
					<button
						className="border rounded-full h-10 w-10 grid place-content-center"
						onClick={(e) => {
							e.stopPropagation()
							instanceRef.current?.prev()
						}}
						disabled={!isActive || currentSlide === 0}
					>
						<ChevronLeft className="h-4 w-4 " />
					</button>
					<button
						className="border rounded-full h-10 w-10 grid place-content-center"
						onClick={(e) => {
							e.stopPropagation()
							instanceRef.current?.next()
						}}
						disabled={!isActive || currentSlide + slidePerView === totalSlides}
					>
						<ChevronRight className="h-4 w-4 " />
					</button>
				</div>
			</div>

			<div ref={sliderRef} className="keen-slider">
				{products?.map((product) => (
					<div key={product.id} className="keen-slider__slide">
						<Link href={`/products/${product.id}`}>
							{/* <img src={product[0].images[0]} alt="" /> */}

							<p>{product.name}</p>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
}
