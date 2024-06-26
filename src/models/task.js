import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    completeTo: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

const Task = mongoose.model("Task", taskSchema)

export default Task