import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import createHttpError from 'http-errors'
import morgan from 'morgan'

import adminRoutes from './routes/admin'
import appRoutes from './routes/app'
import errorHandler from './middlewares/errorHandler'

dotenv.config({})

const app = express()
const port = process.env.PORT || 5000

const allowedDomains = ['http://localhost:3000', 'http://localhost:4000']

app.use(express.json({ limit: '10mb' }))
app.use(helmet())
app.use(
	cors({
		origin: allowedDomains,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)
app.use(morgan('dev'))

app.use('/api/admin', adminRoutes)
app.use('/api', appRoutes)
app.get('/', (req, res) => {
	res.json({
		info: 'Rest API for Nike Shoe Store',
	})
})
app.use((req, res, next) => {
	next(createHttpError.NotFound('Page Not Found'))
})
app.use(errorHandler)

app.listen(port, () => {
	console.log(`[server] running on port ${port}`)
})
