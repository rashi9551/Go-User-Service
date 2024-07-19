import { UserInterface } from '../entities/user'
import auth from '../middleware/auth'
import userRepository from '../repositories/userRepo'
import { testerLogin } from '../utilities/interface'
import { comparePassword } from '../utilities/passwordCompare'

const userRepo=new userRepository()

export default class loginUseCase{
    checkLoginUser=async (mobile:number)=>{
        try {
            const user=await userRepo.findUser(mobile) as UserInterface            
            if(user)
            {
                if(user.account_status!="Blocked"){
                    const token = await auth.createToken(user._id.toString(), '15m');
                    const refreshToken = await auth.createToken(user._id.toString(), '7d');
                return {message:"Success",name:user.name,token,_id:user._id,refreshToken}
                }else {
                    return {message:"Blocked "}
                }
            }else{
                return {message:"No user found"}
            }
        } catch (error) {
            return (error as Error).message

        }
    }
    checkGoogleUser=async(email:string)=>{
        try {
            const user=await userRepo.findEmail(email) as UserInterface
            if(user)
                {
                    if(user.account_status!="Blocked"){
                        const token=await auth.createToken(user._id.toString(),'15m')
                        const refreshToken = await auth.createToken(user._id.toString(), '7d');
                        return {message:"Success",name:user.name,token,_id:user._id,refreshToken}
                    }else {
                        return {message:"Blocked"}
                    }
                }else{
                    return {message:"No user found"}
                }
        } catch (error) {
            return (error as Error).message

        }
    }
    testerLogin=async(data:testerLogin)=>{
        try {
            const {email,password}=data

            const user=await userRepo.findEmail(email) as UserInterface
            const isMatch=await comparePassword(password,user.password)
            console.log(isMatch,"ajhfgasjhfgjhgfashj");
            
            if(isMatch)
                {
                    if(user.account_status!="Blocked"){
                        const token=await auth.createToken(user._id.toString(),'15m')
                        const refreshToken = await auth.createToken(user._id.toString(), '7d');
                        return {message:"Success",name:user.name,token,_id:user._id,refreshToken}
                    }else {
                        return {message:"Blocked"}
                    }
                }else{
                    return {message:"incorrect password"}
                }
        } catch (error) {
            return (error as Error).message

        }
    }

}