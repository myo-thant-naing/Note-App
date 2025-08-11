import { NextFunction, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { authRequest } from "./authMiddleware";
import { Todo } from "../models/todo";

const authorizeOwner = asyncHandler(async (req: authRequest, res: Response, next: NextFunction) => {
    const { todoId } = req.params
    const todo = await Todo.findById(todoId);
    if (!todo) {
        res.status(404)
        throw new Error("Todo not found");
    }
    if (todo.userId.toJSON() !== req.user?._id.toString()) {
        res.status(500)
        throw new Error("Internal server error")
    }
    next()

}
)
export { authorizeOwner }