import { Response } from "express";
import jwt from "jsonwebtoken"
import { Types } from "mongoose";

const generateToken = (res: Response, userId: Types.ObjectId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
        expiresIn: "7d"
    })
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export default generateToken;