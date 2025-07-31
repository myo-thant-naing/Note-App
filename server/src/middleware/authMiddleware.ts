import { NextFunction, Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import { Types } from "mongoose";

export interface authRequest extends Request {
    user?: {
        name: string,
        email: string,
        _id: string | Types.ObjectId
    }
}
interface User {
    name: string,
    email: string,
    _id: string | Types.ObjectId
}

const protect = asyncHandler(async (req: authRequest, res: Response, next: NextFunction) => {
    let token;

    token = req.cookies.token;

    if (!token) {
        res.status(401);
        throw new Error("Not authorized.")
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if (!decoded) {
            res.status(401);
            throw new Error("Not authorized, invalid token.")
        }
        req.user = await User.findById(decoded.userId).select("-password") as User;
        next();
    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, invalid token.")
    }
})

export { protect }