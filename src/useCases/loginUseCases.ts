import { UserInterface } from '../entities/user'
import auth from '../middleware/auth'
import userRepository from '../repositories/userRepo'

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

}