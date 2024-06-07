import adminUseCases from "../useCases/adminUseCase";
import auth from "../middleware/auth";
import { ObjectId } from "mongodb";
import { log } from "@grpc/grpc-js/build/src/logging";
const adminUseCase= new adminUseCases()

export default class adminController{
    login=async(call:any,callback:any)=>{
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
    }
    getUnblockedData=async(call:any,callback:any)=>{
        try {
            const User=await adminUseCase.getData("Good")
            console.log(User,"ithu user");
            callback(null,{User})
        } catch (error) {
            console.log(error);
        }
    }
    getBlockedData=async(call:any,callback:any)=>{
        try {
            const User=await adminUseCase.getData("Blocked")
            callback(null,{User})
        } catch (error) {
            console.log(error);
        }
    }
    updateUserStatus=async(call:any,callback:any)=>{
        try {
            const {id} = call.request
            const {status}=call.request            
            const response = await adminUseCase.updateStatus(id,status);         
            callback(null,{message:"Success"})
        } catch (error) {
            console.log(error);
        }
    }
    getUserData=async(call:any,callback:any)=>{
        try {
            const {id}=call.request            
            const response = await adminUseCase.getUserData(id)            
            callback(null,response) 
        } catch (error) {
            console.log(error);
            
        }
    }
}