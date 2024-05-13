import userRepo from '../repositories/userRepo'
import bcrypt from '../services/bcrypt';
import { refferalCode } from '../utilities/refferalCodeGenerate';
interface userData{
    name:string;
    email:string;
    mobile:string;
    password:string;
    reffered_Code:string
}

export default{
    user_registration:async (userData:userData)=>{
        const {name,email,mobile,password,reffered_Code}=userData
        
        const refferal_code=refferalCode()
        const hashedPassword=await bcrypt.securePassword(password)
        const newUserData={
            name,
            email,
            mobile,
            password:hashedPassword,
            referral_code:"hgdfgfcghcf"
        }
        const response=await userRepo.saveUser(newUserData)
        if(typeof response !== "string" && response._id){
            // const token = await auth.createToken(response._id.toString())
            return ({message:"Success"});
        }
    },
    checkUser:async (mobile:number)=>{
        try {
            const user=await userRepo.checkUser(mobile)
        if(user)
            {
                return {message:"user already have an account !"}
            }else{
                return {message:"user not registered"}
            }
        } 
        catch (error:unknown) {
            return { message: (error as Error).message };

        }
    }
}