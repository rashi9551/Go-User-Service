import { UserInterface } from '../entities/user'
import auth from '../middleware/auth'
import userRepo from '../repositories/userRepo'

export default class loginUseCase{
    checkLoginUser=async (mobile:number)=>{
        try {
            const user=await userRepo.findUser(mobile) as UserInterface            
            if(user)
            {
                if(user.account_status!="Blocked"){
                    const token=await auth.createToken(user._id.toString())
                    return {message:"Success",name:user.name,token,_id:user._id}
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
    checkGoogleUser=async(email:string)=>{
        try {
            const user=await userRepo.findEmail(email) as UserInterface
            console.log(user,"ithu user");
            if(user)
                {
                    if(user.account_status!="Blocked"){
                        const token=await auth.createToken(user._id.toString())
                        return {message:"Success",name:user.name,token,_id:user._id}
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