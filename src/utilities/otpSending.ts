import auth from "../middleware/auth";
import generateOTP from "../services/generateOtp";
import { sendMail } from "../services/nodeMailer";


export const sendOtp=async(email:string,name:string)=>{
    try {
        const otp = generateOTP();
        const token = await auth.createToken(otp);        
        const subject = "Otp Verification";
        const text = `Hello ${name},\n\nThank you for registering with Go!, your OTP is ${otp}\n\nHave a nice day!!!`;
        await sendMail(email, subject, text);
        console.log(otp,token,"sfjhagfjhsg");
        return token
    } catch (error) {
        console.log(error);
        
    }
}