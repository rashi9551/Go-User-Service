import { Request,Response,NextFunction } from "express";
import registartion from "../../useCases/registartion";

export default{
    sigunp:async (req:Request ,res:Response,next:NextFunction)=>{
        const {name,email,mobile,password, reffered_Code} = req.body
        const userData={
            name,
            email,
            mobile,
            password,
            reffered_Code
        }
        try {
            const response=await registartion.user_registration(userData)
            res.json(response)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }

    },

    checkUser:async (req:Request,res:Response,next:NextFunction)=>{
        const {mobile} = req.body
        try {
            const response=await registartion.checkUser(mobile)
            res.json(response)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }

    },
}
