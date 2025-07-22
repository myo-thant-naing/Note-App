import { Request, Response } from "express";
import { Todo } from "../models/todo";

export const createNewTodo = async(req: Request,res : Response)=>{
    try {
        const {title} = req.body;
       const newTodo = await Todo.create({
            title 
        })
          res.status(200).json({message : "New todo is added.",todo: newTodo})
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Something went wrong."})
        
    }
}

export const getTodos = async (req: Request,res : Response)=>{
    try {
        const todos = await Todo.find();
         res.status(200).json({message : "All todo fetched",todos})
    } catch (error) {
        console.log(error);
         res.status(500).json({message : "Something went wrong."})
    }
}


export const getTodo = async (req: Request,res : Response)=>{
     const {todoId} = req.params
    try {
        const todo = await Todo.findById(todoId);
         res.status(200).json({message : "todo has been fetched",todo})
    } catch (error) {
        console.log(error);
         res.status(500).json({message : "Something went wrong."})
    }
}

export const updateTodo = async (req: Request,res : Response)=>{
     const {todoId} = req.params
     const {title} = req.body
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(todoId,{title})
         res.status(200).json({message : "todo has been updated",todo: updatedTodo})
    } catch (error) {
        console.log(error);
         res.status(500).json({message : "Something went wrong."})
    }
}

export const deleteTodo = async (req: Request,res : Response)=>{
    const {todoId} = req.params
    try {
         await Todo.findByIdAndDelete(todoId);
         res.status(200).json({message : "todo has been deleted"})
    } catch (error) {
        console.log(error);
         res.status(500).json({message : "Something went wrong."})
    }
}



