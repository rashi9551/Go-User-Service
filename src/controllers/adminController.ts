import { Response,Request } from "express"
import user from "../entities/user"
import auth from "../middleware/auth"
import { ObjectId } from "mongodb"


export default {
    login:async(call:any,callback:any)=>{
        try {
            const {email,password}=call.request   
            console.log(call.request);
            if (email ==="admin@gmail.com" && password ==="Admin@123") {            
                const token = await auth.createToken(new ObjectId())
                callback(null, {message: "Success", email: process.env.ADMIN_EMAIL||"admin@gmail.com",token});
            } else {
                callback(null,{ message: "Invalid Credentials" });
            }
            
            
        } catch (error) {
            
        }
    },
    getData:async(call:any,callback:any)=>{
        try {
            const User=await user.find({account_status:'Good'})
            console.log(User,"ithu good");
            callback(null,{User})
        } catch (error) {
            console.log(error);
            
        }
    },
    getBlockedData:async(call:any,callback:any)=>{
        try {
            const User=await user.find({account_status:'Blocked'})
            console.log(User,"ithu blocked");
            
            callback(null,{User})
        } catch (error) {
            console.log(error);
        }
    },
    blockUser:async(call:any,callback:any)=>{
        try {
            const {id} = call.request            
            const response = await user.findByIdAndUpdate(id,{
                $set:{
                    account_status:"Blocked"
                }
            });         
            callback(null,{message:"user Blocked successfully"})
        } catch (error) {
            console.log(error);
        }
    },
    unblockUser:async(call:any,callback:any)=>{
        try {
            const {id} = call.request            
            const response = await user.findByIdAndUpdate(id,{
                $set:{
                    account_status:"Good"
                }
            });         
            callback(null,{message:"user Unblocked successfully"})
        } catch (error) {
            console.log(error);
        }
    },
    
}