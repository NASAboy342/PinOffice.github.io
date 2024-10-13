import { BaseResponse } from "@/Models/BaseResponse.js";
import { User } from "@/Models/User.js";

export interface GetAccountInfoResponse extends BaseResponse{
    user: User
}