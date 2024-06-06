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
    getUser=async(call:any,callback:any)=>{
        try {
            const {id}=call.request
            console.log(id);
            
            const response=await user.findById(id)
            console.log(response);
            if (response) {
                const formattedDate = moment(response.joiningDate).format("dddd, DD-MM-YYYY");
                const formattedUserData = { ...response.toObject(), formattedDate };
                const formattedTransactions = formattedUserData.wallet.transactions.map((transactions) => ({
                    ...transactions,
                    formattedDate: moment(transactions.date).format("dddd, DD-MM-YYYY"),
                }));
                const newData = { ...formattedUserData, formattedTransactions };
                console.log(newData,"ithu new data");
                callback(null,newData);
            } else {
                callback(null,{ message: "Soemthing Internal Error" });
            }
        } catch (error) {
            console.log(error);
            callback(null,{ error: (error as Error).message });
        }
    }

    profileUpdate=async(call:any,callback:any)=>{
        const {name,email,mobile,id}=call.request
        console.log(call.request);
        
        try {
            const updateFields: { name?: string; email?: string; mobile?: number } = {};

            if (name) {
                updateFields.name = name;
            }

            if (email) {
                updateFields.email = email;
            }

            if (mobile) {
                updateFields.mobile = mobile;
            }

            const userData= await user.findOneAndUpdate({_id:id},{$set:updateFields},{new:true}).exec()
            if(userData){
                
                const formattedDate = moment(userData.joiningDate).format("dddd, DD-MM-YYYY");
                    const formattedUserData = { ...userData.toObject(), formattedDate };
                    const formattedTransactions = formattedUserData.wallet.transactions.map((transactions) => ({
                        ...transactions,
                        formattedDate: moment(transactions.date).format("dddd, DD-MM-YYYY"),
                    }));
                    const newData = { ...formattedUserData, formattedTransactions};
                    console.log(newData,"ithu new data vanney");
                    callback(null,{newData:newData,message:"Success"})
            }
            
        } catch (error) {
            console.log(error);
            
            callback(null,{ error: (error as Error).message });

        }
    }
}