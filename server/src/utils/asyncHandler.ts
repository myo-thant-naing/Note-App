import { NextFunction, Request, Response } from "express";
import { authRequest } from "../middleware/authMiddleware";

const asyncHandler = (controllerFn: (req: Request | authRequest, res: Response, next: NextFunction) => Promise<void>) =>
    (req: Request | authRequest, res: Response, next: NextFunction) => {
        Promise.resolve(controllerFn(req, res, next)).catch(next)
    }
export default asyncHandler;