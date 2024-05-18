import user from '../entities/user'

interface registration {
    name:string;
    email:string;
    mobile:number;
    password:string;
    referral_code:string;
}


export default {
    saveUser:async(userData:registration)=>{
        const newUser= new user({
            name:userData.name,
            email:userData.email,
            mobile:userData.mobile,
            password:userData.password,
            referral_code:userData.referral_code
        });try {
            const saveUser=await newUser.save();
            console.log("user saved into db");
            
            return saveUser
        } catch (error) {
            return (error as Error).message
        }
    },
    checkUser:async (mobile:number)=>{
        try {
            const userDetail=await user.findOne({mobile})
            return userDetail
        } catch (error) {
            return (error as Error).message

        }
    },
    findUser:async(mobile:number)=>{
        try {
            const userData =await user.findOne({mobile})
            return userData
            
        } catch (error) {
            return (error as Error).message

        }
    }
}