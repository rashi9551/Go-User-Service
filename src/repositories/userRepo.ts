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

interface ridePayment {
    userId: string;
    paymentMode: string;
    amount: number;
    rideId:string;

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
            console.log(error);
            return (error as Error).message

        }
    }
    findEmail=async(email:string)=>{
        try {
            const userData=await User.findOne({email})
            return userData
        } catch (error) {
            console.log(error);
            return (error as Error).message

        }
    }
    findUserWithStatus=async(status:string)=>{
        try {
            const user=await User.find({account_status:status})
            return user
            
        } catch (error) {
            console.log(error);
            return (error as Error).message
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
            return (error as Error).message
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
    rideCancelUpdate=async(id:string,)=>{
        try {
            const userData= await User.findOneAndUpdate({_id:id},{
                    $inc: {
                        "RideDetails.cancelledRides": 1,
                    },
                },{new:true}).exec()
            return userData 
        } catch (error) {
            console.log(error);
            return (error as Error).message
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
                return (error as Error).message  
            }
    }
    RidePayment=async(rideData:ridePayment,)=>{
        try {
            const {paymentMode,amount,userId,rideId}=rideData
            const userData = await User.findById(userId);
            if(userData){
                if(paymentMode==="Cash in hand"){
                    try {
                        await User.findByIdAndUpdate(userId, {
                            $inc: {
                                "RideDetails.completedRides": 1,
                            },
                        });
                        return({ message: "Success" });
                    } catch (error) {
                        console.log(error);
                        return((error as Error).message);
                    }
                }else if(paymentMode === 'Wallet'){
                    try {
                        const userNewBalance=userData?.wallet?.balance-amount
                        const userTransaction = {
                            date: new Date(),
                            details: `Payment for the ride ${rideId}`,
                            amount: amount,
                            status: "Debit",
                        };

                        await User.findByIdAndUpdate(userId, {
                            $set: {
                                "wallet.balance": userNewBalance,
                            },
                            $push: {
                                "wallet.transactions": userTransaction,
                            },
                            $inc: {
                                "RideDetails.completedRides": 1,
                            },
                        });
                        return({ message: "Success" });

                    } catch (error) {
                        console.log(error);
                        return (error as Error).message  
                    }
                }
            }
            
        } catch (error) {
            console.log(error);
            return (error as Error).message
        }
    }

}