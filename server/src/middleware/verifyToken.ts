import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
    // const token = req.headers['token'];
    const token = req.body.token || req.query.token;

    try{
        
        if(token){
            //@ts-ignore
            // const jwtRes = jwt.verify(token, process.env.secretKey)
            const jwtRes = jwt.verify(token, "ORANITSHELI66912")

            //@ts-ignore
            req.userId = jwtRes._id;
            next();
        }
        else{
            res.sendStatus(401);
        }
    }
    catch(err) {
        console.log(err);
        res.sendStatus(401);
    }
}

export {verifyToken};