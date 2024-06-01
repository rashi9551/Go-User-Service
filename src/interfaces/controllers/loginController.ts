import { Request,Response,NextFunction } from "express";
import registartion from "../../useCases/login";
import jwt, { JwtPayload } from "jsonwebtoken";
import user from "../../entities/user";
import moment from "moment";

export default {
    checkLoginUser:async (req:Request,res:Response,next:NextFunction)=>{
        const {mobile}=req.body
        try {
            const response=await registartion.checkLoginUser(mobile)
            res.json(response)
        } catch (error) {
            console.log(error);
            
        }

    },
    checkGoogleLoginUser:async(req:Request,res:Response)=>{
        try {
            const {email}=req.body
            console.log(email);
            const response=await registartion.checkGoogleUser(email)
            res.json(response)
            
        } catch (error) {
            console.log(error);
        }
    },
    getUser:async(req:Request,res:Response)=>{
        try {
            const {id}=req.query
            console.log(id);
            
            const response=await user.findById(id)
            if (response) {
                const formattedDate = moment(response.joiningDate).format("dddd, DD-MM-YYYY");
                const formattedUserData = { ...response.toObject(), formattedDate };
                const formattedTransactions = formattedUserData.wallet.transactions.map((transactions) => ({
                    ...transactions,
                    formattedDate: moment(transactions.date).format("dddd, DD-MM-YYYY"),
                }));
                const newData = { ...formattedUserData, formattedTransactions };
                res.json(newData);
            } else {
                res.status(500).json({ message: "Soemthing Internal Error" });
            }
        } catch (error) {
            console.log(error);

        }
    },

    profileUpdate:async(req:Request,res:Response)=>{
        const {user_id}=req.query
        const {name,email,mobile}=req.body

        try {
            const updateFields: { name?: string; email?: string; mobile?: number } = {};

            if (name) {
                updateFields.name = name;
            }

            if (email) {
                updateFields.email = email;
            }

            if (mobile) {
                updateFields.mobile = mobile;
            }

            const userData= await user.findOneAndUpdate({_id:user_id},{$set:updateFields},{new:true}).exec()

            res.json({message:"Success",userData})
            
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });

        }
    }
}