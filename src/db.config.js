import mongoose from "mongoose";

const connectToDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DATABASE connected successfully")

    } catch (error) {
        console.log("DATABASE connecting faild", error)
        process.exit(1)
    }
}

export default connectToDB