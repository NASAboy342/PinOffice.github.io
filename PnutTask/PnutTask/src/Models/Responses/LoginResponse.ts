import { User } from '@/Models/User.js';
import { BaseResponse } from '../BaseResponse.js';

export interface LoginResponse extends BaseResponse {
    user: User
}