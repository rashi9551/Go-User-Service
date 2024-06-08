import userRepository from "../repositories/userRepo"

const userRepo=new userRepository()

export default class adminUseCase{
    getData=async(status:string)=>{
        const response=userRepo.findUserWithStatus(status)
        return response
    }
    getUserData=async(id:string)=>{
        const response=userRepo.findUserById(id)
        return response
    }

    updateStatus=async(id:string,status:string)=>{        
        let updateStatus=''
        if(status==='Block'){
            updateStatus+="Blocked"
        }
        else if(status==="Good"){
            updateStatus+=status
        }
        const response=userRepo.findAndUpdate(id,updateStatus)
        return response
    }


}