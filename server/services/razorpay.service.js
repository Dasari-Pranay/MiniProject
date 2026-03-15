import dotenv from "dotenv"
import Razorpay from "razorpay"
dotenv.config()



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET,
});

export default razorpay