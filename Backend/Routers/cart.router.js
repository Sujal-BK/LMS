import express from 'express'
import { addTocart, createOrder } from '../Controllers/cart.controller.js'
import { jsonAuthMiddleware } from '../Middlewares/auth.middleware.js'

const router = express.Router()

router.post('/add-to-cart/:id',jsonAuthMiddleware,addTocart)

router.post('/createOrder',createOrder)



export default router