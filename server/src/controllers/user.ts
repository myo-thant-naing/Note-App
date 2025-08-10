import { Request, Response } from "express";
import { User } from "../models/user";
import generateToken from "../utils/generatetoken";
import asyncHandler from "../utils/asyncHandler";
import { authRequest } from "../middleware/authMiddleware";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const avator = `https://ui-avatars.com/api/?name=${name}&background=random&length=1`;

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        res.status(400);
        throw new Error("Email is already used.")
    }
    const user = await User.create({
        name,
        avator,
        email,
        password

    })
    if (user) {
        res.status(201).json({
            message: "successfully created your account.",
            _id: user._id,
            name: user.name,
            avator: user.avator,
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
            avator: existingUser.avator,
            email: existingUser.email
        })
    } else {
        res.status(401);
        throw new Error("Invalid username or password")
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

export const getUserProfile = asyncHandler(async (req: authRequest, res: Response) => {
    const user = req.user
    res.status(200).json(user)
})

export const updateUserProfile = asyncHandler(async (req: authRequest, res: Response) => {
    const user = await User.findById(req.user?._id);
    if (!user) {
        res.status(404);
        throw new Error("User not found.")
    }

    if (req.body.avator === "noAvator" || req.body.avator.startsWith("https://ui-avatars.com/api/")) {
        const avator = `https://ui-avatars.com/api/?name=${req.body.name}&background=random&length=1`;
        user.avator = avator;
    } else {
        user.avator = req.body.avator;
    }

    user.name = req.body.name
    const { email } = req.body;
    if (email != user.email) {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            res.status(401);
            throw new Error("Invalid credentials")
        }
    }
    user.email = email || user.email;
    const updatedUser = await user.save();
    const selectedUser = {
        _id: updatedUser._id,
        name: updatedUser.name,
        avator: updatedUser.avator,
        email: updatedUser.email
    }
    res.status(200).json(selectedUser)
})