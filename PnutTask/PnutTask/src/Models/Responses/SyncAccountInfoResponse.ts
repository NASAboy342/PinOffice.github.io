import { BaseResponse } from '../BaseResponse.js';
import { User } from '../User.js';


export interface SyncAccountInfoResponse extends BaseResponse {
    user: User
}