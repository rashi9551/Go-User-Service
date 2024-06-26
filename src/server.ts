import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import connectDB from './config/mongo';


import registrationControl from './controllers/registrationController';
import loginControl from './controllers/loginController';
import adminControl from './controllers/adminController';
import userControl from './controllers/userController';

const adminController= new adminControl()
const loginController= new loginControl()
const registrationController= new registrationControl() 
const userController=new userControl()

connectDB();

const packageDef = protoLoader.loadSync(path.resolve(__dirname, './proto/user.proto'), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});


const grpcObject = grpc.loadPackageDefinition(packageDef) as unknown as any;
const userProto = grpcObject.user_package;


if (!userProto || !userProto.User || !userProto.User.service) {
  console.error("Failed to load the User service from the proto file.");
  process.exit(1);
}


const server = new grpc.Server();


server.addService(userProto.User.service, {
  Register: registrationController.signup,
  CheckUser: registrationController.checkUser,
  ResendOtp: registrationController.resendOtp,
  CheckGoogleLoginUser: loginController.checkGoogleLoginUser,
  CheckLoginUser: loginController.checkLoginUser,
  GetUser: userController.getUser,
  ProfileUpdate:userController.profileUpdate,
  addWalletBalance:userController.addWalletBalance,
  rideCancelUpdate:userController.rideCancelUpdate,
  RidePayment:userController.RidePayment,
  AdminLogin: adminController.login,
  AdminGetData: adminController.getUnblockedData,
  AdminGetBlockedData: adminController.getBlockedData,
  AdminUpdateUserStatus: adminController.updateUserStatus,
  AdminGetUserData: adminController.getUserData,
});


const grpcServer = () => {
  const port = process.env.PORT || '3002';
  console.log(port,"sdjfgsjh");
  
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (err, bindPort) => {
    if (err) {
      console.error("Error starting gRPC server:", err);
      return;
    }
    console.log(`gRPC user server started on port: ${bindPort}`);
    server.start();
  });
};

grpcServer();
