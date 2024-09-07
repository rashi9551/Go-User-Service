import { Request,Response,NextFunction } from "express";
import loginUseCases from "../useCases/loginUseCases";

const loginUseCase=new loginUseCases()

export default class loginController{
    checkLoginUser=async (call:any,callback:any)=>{
        const {email}=call.request
        console.log(call.request);
        
        try {
            const response=await loginUseCase.checkLoginUser(email)
            callback(null,response)
        } catch (error) {
            console.log(error);
            callback(null,{ error: (error as Error).message });
        }
    }
    verifyOtp=async (call:any,callback:any)=>{
        const {otp,email}=call.request
        console.log(call.request);
        try {
            const response=await loginUseCase.verifyOtp(otp,email)
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
    testerLogin=async(call:any,callback:any)=>{
        try {
            console.log(call.request);
            const response=await loginUseCase.testerLogin(call.request)
            console.log(response);
            callback(null,response)
        } catch (error) {
            console.log(error);
            callback(null,{ error: (error as Error).message });
        }
    }
}