import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB database successfully")
    } catch (error) {
        console.error(`Error connecting to MongoDB database: ${error.message}`)
    }
}

export default connectDB