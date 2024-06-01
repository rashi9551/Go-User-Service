import { Response,Request } from "express"
import user from "../../entities/user"
import auth from "../../middleware/auth"
import { ObjectId } from "mongodb"


export default {
    login:async(req:Request,res:Response)=>{
        try {
            const {email,password}=req.body            
            if (email ==="admin@gmail.com" && password ==="Admin@123") {            
                const token = await auth.createToken(new ObjectId())
                res.json({ message: "Success", email: process.env.ADMIN_EMAIL||"admin@gmail.com",token});
            } else {
                res.json({ message: "Invalid Credentials" });
            }
            
            
        } catch (error) {
            
        }
    },
    getData:async(req:Request,res:Response)=>{
        try {
            const response=await user.find({account_status:'Good'})
            res.json(response)
        } catch (error) {
            
        }
    },
    blockUser:async(req:Request,res:Response)=>{
        try {
            const id = req.query.id;
            const response = await user.findByIdAndUpdate(id,{
                $set:{
                    account_status:"Good"
                }
            });         
            res.status(200)
        } catch (error) {
            
        }
    },
    getBlockedData:async(req:Request,res:Response)=>{
        try {
            const response=await user.find({account_status:'Blocked'})
            res.json(response)
        } catch (error) {
            
        }
    },
    unblockUser:async(req:Request,res:Response)=>{
        try {
            const id = req.query.id;
            const response = await user.findByIdAndUpdate(id,{
                $set:{
                    account_status:"Good"
                }
            },
            {
                new:true
            }
        );            
            res.json({message:"Success"})
        } catch (error) {
            console.log(error);
            res.json((error as Error).message);
        }
    },
    
}