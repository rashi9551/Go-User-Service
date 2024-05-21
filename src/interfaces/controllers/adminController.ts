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
    }

}