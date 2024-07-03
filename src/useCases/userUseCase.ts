import moment from "moment";
import userRepository from "../repositories/userRepo";
import Razorpay  from "razorpay"
import 'dotenv/config';
import crypto from 'crypto';

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_SECRET || "",
});

interface updateData {
  name: string;
  email: string;
  mobile: number;
}
interface ridePayment {
  userId: string;
  paymentMode: string;
  amount: number;
  rideId:string;
  razorpayOrderId:string;
  razorpayPaymentId:string;
  razorpaySignature:string;
}


const userRepo = new userRepository();

export default class userUseCase {
  findUser = async (id: string) => {
    try {
      const response = await userRepo.findUserById(id);
      
      if (response) {
        const formattedDate = moment(Number(response.joiningDate)).format(
          "dddd, DD-MM-YYYY"
          );        
        const formattedUserData = { ...response.toObject(), formattedDate };
        const formattedTransactions = formattedUserData.wallet.transactions.map(
          (transactions) =>({
            ...transactions,
            formattedDate: moment(transactions.date).format("dddd, DD-MM-YYYY"),
            })
          );          
        const newData = { ...formattedUserData, formattedTransactions };
        return newData;
      } else {
        return { message: "Soemthing Internal Error" };
      }
            
    } catch (error) {
        console.log(error);
        
    }
  };

  profileUpdate = async (id: string, data: updateData) => {
    try {
      const { name, email, mobile } = data;
      const updateFields: { name?: string; email?: string; mobile?: number } =
        {};

      if (name) {
        updateFields.name = name;
      }

      if (email) {
        updateFields.email = email;
      }

      if (mobile) {
        updateFields.mobile = mobile;
      }

      const userData = await userRepo.findOneAndUpdate(id, updateFields);
      if (userData) {
        const formattedDate = moment(Number(userData.joiningDate)).format(
          "dddd, DD-MM-YYYY"
        );
        const formattedUserData = { ...userData.toObject(), formattedDate };
        const formattedTransactions = formattedUserData.wallet.transactions.map(
          (transactions) => ({
            ...transactions,
            formattedDate: moment(transactions.date).format("dddd, DD-MM-YYYY"),
          })
        );
        const newData = { ...formattedUserData, formattedTransactions };
        return { message: "Success", newData };
      }
    } catch (error) {
      console.log(error);
      return { error: (error as Error).message };
    }
  };
  addWalletBalance = async (id: string, balance: string) => {
    try {        
        const userData=await userRepo.updateWallet(id,balance)
        console.log(id ,balance,"=-=-=-=---=-=-=-=-=-=-=-=----");
        
        if(userData){
          return { message: "success"}
        }
    } catch (error) {
      console.log(error);
      return { error: (error as Error).message };
    }
  };
  rideCancelUpdate = async (id: string) => {
    try {        
        const userData=await userRepo.rideCancelUpdate(id)
        if(userData){
          return { message: "success"}
        }else{
          return { message: 'something went wrong'}
        }
    } catch (error) {
      console.log(error);
      return { error: (error as Error).message };
    }
  };
  RidePayment = async (ridePayment: ridePayment) => {
    try {
      const paymentMode=ridePayment.paymentMode
      if(paymentMode==='Upi'){
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = ridePayment;
        const sign = razorpayOrderId + "|" + razorpayPaymentId;
        
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET||"")
        .update(sign.toString())
        .digest("hex");
        const isAuthentic = expectedSign === razorpaySignature;
        if(isAuthentic){
          const response=await userRepo.RidePayment(ridePayment)
          if(response){
            return { message: "Success"}
          }else{
            return { message: 'database not saved'}
          }
        }else{
          console.log(isAuthentic,"payment is not working");
          return{ message: 'razorpay is not authenticated'}
        }
      }else{
        const response=await userRepo.RidePayment(ridePayment)
        if(response){
          return { message: "Success"}
        }else{
          return { message: 'something went wrong'}
        }
      }
    } catch (error) {
      console.log(error);
      return { error: (error as Error).message };
    }
  };
 razorpayPayment = async (amount: number): Promise<{ message?: string; error?: string }> => {
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
            throw new Error("Razorpay key_id and key_secret must be defined in the environment variables");
        }

        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        return new Promise((resolve, reject) => {
            razorpayInstance.orders.create(options, (error:any, order:any) => {
                if (error) {
                    console.log(error);
                    reject({ message: "Something Went Wrong!" });
                } else {
                    console.log(order, "ithu");
                    resolve(order);
                }
            });
        });
    } catch (error) {
        console.log(error);
        return { error: (error as Error).message };
    }
};


}
