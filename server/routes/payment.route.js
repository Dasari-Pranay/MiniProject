import express from "express"
import { createOrder, verifyPayment } from "../controllers/payment.contoller.js"
import isAuth from "../middlewares/isAuth.js"


const paymentRouter = express.Router()

paymentRouter.post("/order",isAuth, createOrder)
paymentRouter.post("/verify",isAuth, verifyPayment)


export default paymentRouter