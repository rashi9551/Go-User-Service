import { Request,Response,NextFunction } from "express";
import registartion from "../../useCases/login";

export default {
    checkLoginUser:async (req:Request,res:Response,next:NextFunction)=>{
        const {mobile}=req.body
        try {
            const response=await registartion.checkLoginUser(mobile)
            res.json(response)
        } catch (error) {
            
        }

    }
}