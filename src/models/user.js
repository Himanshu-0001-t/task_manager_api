import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({

    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


const User = mongoose.model("User", userSchema)

export default User
