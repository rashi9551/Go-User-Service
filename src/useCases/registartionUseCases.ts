import userRepository from '../repositories/userRepo'
import bcrypt from '../services/bcrypt';
import { refferalCode } from '../utilities/refferalCodeGenerate';
interface userData{
    name:string;
    email:string;
    mobile:number;
    password:string;
    reffered_Code:string,
    userImage:any

}
const userRepo=new userRepository()

export default class registartionUseCase{
    user_registration=async (userData:userData)=>{
        try {
            const {name,email,mobile,password,reffered_Code,userImage}=userData
            const refferal_code=refferalCode()
            const hashedPassword=await bcrypt.securePassword(password)
            const newUserData={
                name,
                email,
                mobile,
                password:hashedPassword,
                referral_code:refferal_code,
                userImage
            }
            const response=await userRepo.saveUser(newUserData)
            if(typeof response !== "string" && response._id){
                return ({message:"Success"});
            }else{
                console.log(response);
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    checkUser=async (mobile:number,email:string)=>{
        try {
            const user=await userRepo.checkUser(mobile,email)
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