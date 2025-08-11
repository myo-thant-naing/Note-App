import { Router } from "express";
import { createNewTodo, deleteTodo, getTodo, getTodos, updateTodo } from "../controllers/todo";
import { protect } from "../middleware/authMiddleware";
import { authorizeOwner } from "../middleware/AuthorizeOwner";

const router = Router();

router.post("/create", protect, createNewTodo)
router.get("/todos", protect, getTodos)
router.get("/todos/:todoId", protect, authorizeOwner, getTodo)
router.put("/todos/:todoId", protect, authorizeOwner, updateTodo)
router.delete("/todos/:todoId", protect, authorizeOwner, deleteTodo)


export default router;