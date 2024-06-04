import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import connectDB from './config/mongo';
import registrationController from './controllers/registrationController';

import loginController from './controllers/loginController';
import adminController from './controllers/adminController';

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
  GetUser: loginController.getUser,
  ProfileUpdate: loginController.profileUpdate,
  AdminLogin: adminController.login,
  AdminGetData: adminController.getData,
  AdminGetBlockedData: adminController.getBlockedData,
  AdminBlockUser: adminController.blockUser,
  AdminUnblockUser: adminController.unblockUser,
});


const grpcServer = () => {
  const port = process.env.PORT || '3001';
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
