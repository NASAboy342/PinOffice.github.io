import { User } from '@/Models/User.js';
import { BaseResponse } from '../BaseResponse.js';

export interface SearchUsersResponse extends BaseResponse {
    users: User[]
}