import jwt, { JwtPayload } from 'jsonwebtoken'
import {Request,Response,NextFunction} from 'express'
import { ObjectId } from 'mongodb'
import { verify } from 'crypto';

interface DecodedToken{
    id:string,
    role:string
}

export default {
    createToken:async(clientId: ObjectId | string, expire: string): Promise<string>=>{
        const jwtSecretKey:string | undefined=process.env.USER_SECRET_KEY  || "Rashid"
        const token = await jwt.sign({ clientId }, jwtSecretKey, { expiresIn: expire });
        return token

    },
     verifyOtpToken :(token: string) => {
        const secretKey = process.env.USER_SECRET_KEY || "Rashid";
        console.log(token);
        
        try {
            const decodedToken = jwt.verify(token, secretKey) as JwtPayload;
            console.log(decodedToken,"decode");
            
            return decodedToken
        } catch (error:any) {
          console.error('Token verification failed:', error.message);
          return ({message:"inavlid otp"});
        }
      },
}
