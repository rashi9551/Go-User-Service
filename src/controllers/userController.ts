import moment from "moment";
import userUseCases from "../useCases/userUseCase";
import { UserInterface } from "../entities/user";



const userUseCase=new userUseCases()

export default class userController{
    getUser=async(call:any,callback:any)=>{
        try {
            const {id}=call.request
            console.log(id);
            const response=await userUseCase.findUser(id) 
            console.log(response,"++++++");
            callback(null,{newData:response})
        } catch (error) {
            console.log(error);
            callback(null,{ error: (error as Error).message });
        }
    }

    profileUpdate=async(call:any,callback:any)=>{
        try {
            const {name,email,mobile,id}=call.request
            console.log(call.request);
            const response=await userUseCase.profileUpdate(id,{name,email,mobile})
            callback(null,response)
            
        } catch (error) {
            console.log(error);
            
        }
    }
    addWalletBalance=async(call:any,callback:any)=>{
        try {
            const {id,balance}=call.request
            console.log(call.request);
            const response=await userUseCase.addWalletBalance(id,balance)
            callback(null,response)
            
        } catch (error) {
            console.log(error);
            
        }
    }
}