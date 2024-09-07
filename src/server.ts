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
  testerLogin: loginController.testerLogin,
  Register: registrationController.signup,
  CheckUser: registrationController.checkUser,
  ResendOtp: registrationController.resendOtp,
  CheckGoogleLoginUser: loginController.checkGoogleLoginUser,
  CheckLoginUser: loginController.checkLoginUser,
  verifyOtp: loginController.verifyOtp,
  GetUser: userController.getUser,
  ProfileUpdate:userController.profileUpdate,
  addWalletBalance:userController.addWalletBalance,
  rideCancelUpdate:userController.rideCancelUpdate,
  RidePayment:userController.RidePayment,
  razorpayPayment:userController.razorpayPayment,
  AdminLogin: adminController.login,
  AdminGetData: adminController.getUnblockedData,
  AdminGetBlockedData: adminController.getBlockedData,
  AdminUpdateUserStatus: adminController.updateUserStatus,
  AdminGetUserData: adminController.getUserData,
  AdminDashboardData: adminController.dashboardData,
});


const grpcServer = () => {
  const port = process.env.USER_GRPC_PORT || '3002';
  console.log(port,"sdjfgsjh");
  const Domain=process.env.NODE_ENV==='dev'?process.env.DEV_DOMAIN:process.env.PRO_DOMAIN_USER
  console.log(Domain);
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
