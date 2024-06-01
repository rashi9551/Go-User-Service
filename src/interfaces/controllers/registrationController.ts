import { Request, Response, NextFunction } from "express";
import registartion from "../../useCases/registartion";
import auth from "../../middleware/auth";
import { sendOtp } from "../../utilities/otpSending";



export default {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, mobile, password, reffered_Code ,otp } = req.body;
    const userData = {
      name,
      email,
      mobile,
      password,
      reffered_Code,
      userImage:req.file
    };
    try {
      const token = req.cookies.otp
      const secretKey = process.env.USER_SECRET_KEY || "Rashid";
      const jwtOtp: any = auth.verifyOtpToken(token);
      console.log(jwtOtp,"ithu coookkie token");
      
      if (otp === jwtOtp?.clientId) {
          const response = await registartion.user_registration(userData);
          console.log(response);
          res.json(response);
      } else {
        res.json({  message: "Invalid OTP" });
      }
    } catch (error) {
        console.log(error);
        
      res.status(500).json({ error: (error as Error).message });
    }
  },

  checkUser: async (req: Request, res: Response, next: NextFunction) => {       
    const { mobile, email, name } = req.body;
    try {
      const response = await registartion.checkUser(mobile,email);
      console.log(response);
      
      if (response.message === "user not registered") {
          console.log("nokkindu");
       const token=await sendOtp(email)    
        res.cookie("otp", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 180000),
          sameSite: "none",
          secure: true,
        });
      }
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  },
  resendOtp:async(req:Request,res:Response)=>{
    try {
        
        const {email,name}=req.body
        console.log("email",email);
        const token=await sendOtp(email)
        res.cookie("otp", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 180000),
          sameSite: "none",
          secure: true,
        });

        res.status(200).json({ message: "OTP resent successfully" });
    } catch (error) {
        console.log(error);
        
    }
  }
};
