import moment from "moment";
import userRepository from "../repositories/userRepo";

interface updateData {
  name: string;
  email: string;
  mobile: number;
}
const userRepo = new userRepository();

export default class userUseCase {
  findUser = async (id: string) => {
    const response = await userRepo.findUserById(id);
    if (response) {
      const formattedDate = moment(response.joiningDate).format(
        "dddd, DD-MM-YYYY"
      );
      const formattedUserData = { ...response.toObject(), formattedDate };
      const formattedTransactions = formattedUserData.wallet.transactions.map(
        (transactions) => ({
          ...transactions,
          formattedDate: moment(transactions.date).format("dddd, DD-MM-YYYY"),
        })
      );
      const newData = { ...formattedUserData, formattedTransactions };
      console.log(newData, "ithu new data");
      return newData;
    } else {
      return { message: "Soemthing Internal Error" };
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
        const formattedDate = moment(userData.joiningDate).format(
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
        console.log(newData, "ithu new data vanney");
        return { message: "Success", newData };
      }
    } catch (error) {
      console.log(error);
      return { error: (error as Error).message };
    }
  };
}
