import moment from "moment";
import userRepository from "../repositories/userRepo";
import Stripe from "stripe";

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
        const response=await userRepo.RidePayment(ridePayment)
        if(response){
          return { message: "Success"}
        }else{
          return { message: 'something went wrong'}
        }
    } catch (error) {
      console.log(error);
      return { error: (error as Error).message };
    }
  };


}
