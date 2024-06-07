import User from '../entities/user'

interface registration {
    name:string;
    email:string;
    mobile:number;
    password:string;
    referral_code:string;
    userImage:any
}

interface updateData {
    name?: string | undefined;
    email?: string | undefined;
    mobile?: number | undefined;
}

export default  class userRepository{
    saveUser=async(userData:registration)=>{
        const newUser= new User({
            name:userData.name,
            email:userData.email,
            mobile:userData.mobile,
            password:userData.password,
            referral_code:userData.referral_code,
            userImage:userData.userImage,
            joiningDate:Date.now()

        });try {
            const saveUser=await newUser.save();
            console.log("user saved into db");
            
            return saveUser
        } catch (error) {
            return (error as Error).message
        }
    }
    checkUser=async (mobile:number,email:string)=>{
        try {
            const userDetailWithMobile = await User.findOne({ mobile });
        if (userDetailWithMobile) {
            return userDetailWithMobile;
        }

        const userDetailWithEmail = await User.findOne({ email });
        if (userDetailWithEmail) {
            return userDetailWithEmail;
        }
        } catch (error) {
            return (error as Error).message

        }
    }
    findUser=async(mobile:number)=>{
        try {
            const userData =await User.findOne({mobile})
            return userData
            
        } catch (error) {
            return (error as Error).message

        }
    }
    findEmail=async(email:string)=>{
        try {
            const userData=await User.findOne({email})
            return userData
        } catch (error) {
            return (error as Error).message

        }
    }
    findUserWithStatus=async(status:string)=>{
        const user=await User.find({account_status:status})
        return user
    }

    findAndUpdate=async(id:string,status:string)=>{
        const user=await User.findByIdAndUpdate(id,{
            $set:{
                account_status:status
            }
        });
        return user         
    }
    findUserById=async(id:string)=>{
        const user=await User.findById(id)
        return user
    }
    findOneAndUpdate=async(id:string,updateFields:updateData)=>{
        const userData= await User.findOneAndUpdate({_id:id},{$set:updateFields},{new:true}).exec()
        return userData
    }

}