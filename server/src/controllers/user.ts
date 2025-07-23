import { Request, Response } from "express";
import { User } from "../models/user";

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        res.status(400);
        throw new Error("Email is already existed.")
    }
    const user = await User.create({
        name,
        email,
        password

    })
    if (user) {
        res.status(201).json({
            message: "successfully created your account.",
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400);
        throw new Error("Something went wrong!")
    }
}