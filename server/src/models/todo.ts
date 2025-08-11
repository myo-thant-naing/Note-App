import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    title: {
        type: String,
        required: true

    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export const Todo = mongoose.model("Todo", todoSchema)