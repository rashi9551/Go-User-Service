import user from '../entities/user'

interface registration {
    name:string;
    email:string;
    mobile:number;
    password:string;
    referral_code:string;
    userImage:any
}


export default {
    saveUser:async(userData:registration)=>{
        const newUser= new user({
            name:userData.name,
            email:userData.email,
            mobile:userData.mobile,
            password:userData.password,
            referral_code:userData.referral_code,
            userImage:userData.userImage
        });try {
            const saveUser=await newUser.save();
            console.log("user saved into db");
            
            return saveUser
        } catch (error) {
            return (error as Error).message
        }
    },
    checkUser:async (mobile:number,email:string)=>{
        try {
            const userDetailWithMobile = await user.findOne({ mobile });
        if (userDetailWithMobile) {
            return userDetailWithMobile;
        }

        const userDetailWithEmail = await user.findOne({ email });
        if (userDetailWithEmail) {
            return userDetailWithEmail;
        }
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
    },
    findEmail:async(email:string)=>{
        try {
            const userData=await user.findOne({email})
            return userData
        } catch (error) {
            return (error as Error).message

        }
    }
}