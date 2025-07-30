import { Request, Response } from "express";
import { User } from "../models/user";
import generateToken from "../utils/generatetoken";
import asyncHandler from "../utils/asyncHandler";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
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
})

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email })

    if (existingUser && await existingUser.matchPassword(password)) {
        generateToken(res, existingUser._id)
        res.status(200).json({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email
        })
    } else {
        res.status(401);
        throw new Error("Invalid credentials")
    }
})

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({
        message: "successfully logouted."
    })
})