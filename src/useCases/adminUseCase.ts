import userRepository from "../repositories/userRepo"

const userRepo=new userRepository()

export default class adminUseCase{
    getData=async(status:string)=>{
         try {
             const response=userRepo.findUserWithStatus(status)
             return response
            
            } catch (error) {
                console.log(error);
                
            }
    }
    getUserData=async(id:string)=>{
        try {
            const response=userRepo.findUserById(id)
            return response
            
        } catch (error) {
            console.log(error);
            
        }
    }
    dashboardData=async()=>{
        try {
            const response=userRepo.dashboardData()
            return response
            
        } catch (error) {
            console.log(error);
            
        }
    }

    updateStatus=async(id:string,status:string)=>{ 
        try {
            let updateStatus=''
            if(status==='Block'){
                updateStatus+="Blocked"
            }
            else if(status==="Good"){
                updateStatus+=status
            }
            const response=userRepo.findAndUpdate(id,updateStatus)
            return response
            
        } catch (error) {
            console.log(error);
            
        }       
    }


}