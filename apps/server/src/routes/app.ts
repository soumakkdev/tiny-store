import express from 'express'
import { getProduct, getProducts } from '../controllers/app/products'

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:productId', getProduct)

export default router
