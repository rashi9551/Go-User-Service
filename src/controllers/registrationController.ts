import registartionUseCases from "../useCases/registartionUseCases";
import auth from "../middleware/auth";
import { sendOtp } from "../utilities/otpSending";


const registartionUseCase = new registartionUseCases()


export default class registrationController{
  signup= async (call:any,callback:any) => {
    const { name, email, mobile, password, refferredCode ,otp,userImage,token } = call.request
    console.log(call.request);
    
    const userData = {
      name,
      email,
      mobile,
      password,
      refferredCode,
      userImage,
      otp,
      token
    };
    try {
      const jwtOtp: any = auth.verifyOtpToken(token);
      console.log(otp,jwtOtp,"ithu coookkie token");
      if (otp === jwtOtp?.clientId) {
          const response = await registartionUseCase.user_registration(userData);
          console.log(response);
          callback(null,response);
      } else {
        console.log("otp invalid");
        callback(null,{ message: "Invalid OTP" });
      }
    } catch (error) {
        console.log(error);
        
      callback(500,{ error: (error as Error).message });
    }
  }

  checkUser= async (call: any, callback: any) => {
    const { mobile, email ,name} = call.request;  
    try {
      const response = await registartionUseCase.checkUser(mobile, email);
      console.log(response);
      
      if (response.message === "user not registered") {
        console.log("nokkindu");
        const token = await sendOtp(email,name);
        console.log(token,"controll");
        callback(null,{token,message:response.message} );
      } else {
        callback(null, response); 
      }
    } catch (error) {
      console.error("Error in checkUser:", error);
      callback({
        code: null,
        message: (error as Error).message || 'Unknown error occurred during checkUser'
      });
    }
  }
  
  resendOtp=async(call: any, callback: any)=>{
    try {
        const {email,name}=call.request
        console.log("email",email);
        const token=await sendOtp(email,name)
        console.log(token,"ithu token");
        callback(null,{token, message: "OTP resent successfully" });
    } catch (error) {
        console.log(error);
        callback(null,{ message: "OTP resent errored" });
    }
  }
};
