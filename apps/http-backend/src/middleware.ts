import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';

export async function middleware(req: Request, res: Response, next: NextFunction) {
    try {
       const token=req.headers["authorization"] ?? "";
       console.log("Token:", token);
       
       if(!JWT_SECRET){
        return;
       }
       const decoded=jwt.verify(token,JWT_SECRET);
       
        if(typeof(decoded)==="string"){
            return;
        }

       if(decoded){
            req.userId=decoded.userId;
            next();
       }else{
        res.status(403).json({
            message: "Unauthorized"
        })
       }
    } catch (err) {
        res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}

// Extend Express Request object to include userId
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}
