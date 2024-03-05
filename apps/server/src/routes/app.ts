import express from 'express'
import { getProduct, getProducts } from '../controllers/app/products'
import { getAuthUser, signup } from '../controllers/app/auth'
import { verifyUserAuth } from '../middlewares/verifyAuth'

const router = express.Router()

router.get('/products', getProducts)
router.get('/products/:productId', getProduct)
router.post('/auth/signup', signup)
router.get('/auth/user', verifyUserAuth, getAuthUser)

export default router
