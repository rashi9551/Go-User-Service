import mongoose, { Document, Schema } from "mongoose";

export interface UserInterface extends Document {
    name: string;
    email: string;
    mobile: number;
    password: string;
    userImage: string;
    referral_code: string;
    account_status: string;
    joiningDate: string;
    wallet: {
        balance: number;
        transactions: {
            date: Date;
            details: string;
            amount: number;
            status: string;
        }[];
    };
    RideDetails: {
        completedRides: number;
        cancelledRides: number;
    };
}


const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userImage: {
        type: String,
    },
    referral_code: {
        type: String,
    },
    joiningDate: {
        type: String,
        deafult: Date.now(),
    },
    account_status: {
        type: String,
    },
    wallet: {
        balance: {
            type: Number,
            default: 0,
        },
        transactions: [
            {
                date: {
                    type: Date,
                },
                details: {
                    type: String,
                },
                amount: {
                    type: Number,
                },
                status: {
                    type: String,
                },
            },
        ],
    },

    RideDetails: {
        completedRides: {
            default: 0,
            type: Number,
        },
        cancelledRides: {
            default: 0,
            type: Number,
        },
    },
});
const userModel=mongoose.model<UserInterface>("User", UserSchema);

export default  userModel
