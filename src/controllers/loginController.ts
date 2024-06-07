import { Request,Response,NextFunction } from "express";
import loginUseCases from "../useCases/loginUseCases";
import user from "../entities/user";
import moment from "moment";

const loginUseCase=new loginUseCases()

export default class loginController{
    checkLoginUser=async (call:any,callback:any)=>{
        const {mobile}=call.request
        console.log(call.request);
        
        try {
            const response=await loginUseCase.checkLoginUser(mobile)
            callback(null,response)
        } catch (error) {
            console.log(error);
            callback(null,{ error: (error as Error).message });
        }
    }
    checkGoogleLoginUser=async(call:any,callback:any)=>{
        const {email}=call.request
        console.log(call.request);
        try {
            const response=await loginUseCase.checkGoogleUser(email)
            console.log(response);
            callback(null,response)
        } catch (error) {
            console.log(error);
            callback(null,{ error: (error as Error).message });
        }
    }
}