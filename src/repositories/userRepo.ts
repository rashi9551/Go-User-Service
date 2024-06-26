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
        try {
            const user=await User.find({account_status:status})
            return user
            
        } catch (error) {
            console.log(error);
            
        }
    }

    findAndUpdate=async(id:string,status:string)=>{
        try {
            const user=await User.findByIdAndUpdate(id,{
                $set:{
                    account_status:status
                }
            });
            return user         
            
        } catch (error) {
            console.log(error);
            
        }

    }
    findUserById=async(id:string)=>{
        try {
            const user=await User.findById(id)
            return user
            
        } catch (error) {
            console.log(error);
            
        }
    }
    findOneAndUpdate=async(id:string,updateFields:updateData)=>{
        try {
            const userData= await User.findOneAndUpdate({_id:id},{$set:updateFields},{new:true}).exec()
            return userData
            
        } catch (error) {
            console.log(error);
            
        }
    }
    updateWallet=async(id:string,balance:string)=>{
        try {
            const userData = await User.findById(id);
                if (userData) {
                    const userNewBalance = userData.wallet.balance + Number(balance);
                    const userTransaction = {
                        date:new Date() ,
                        details: `Wallet recharged`,
                        amount: balance,
                        status: "Credit",
                    };

                    await User.findByIdAndUpdate(id, {
                        $set: {
                            "wallet.balance": userNewBalance,
                        },
                        $push: {
                            "wallet.transactions": userTransaction,
                        },
                });
                return userData 
            } 
        }
        catch (error) {
                console.log(error);    
            }
    }

}