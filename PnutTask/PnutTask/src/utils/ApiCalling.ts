import * as GetTaskRequest from '../Models/Requests/GetTaskRequest.js';
import * as GetTaskResopnse from '../Models/Responses/GetTaskResopnse.js';
import * as SetTasksRequest from '@/Models/Requests/SetTasksRequest.js';
import * as BaseResponse from '../Models/BaseResponse.js';
import * as UpdateTasksRequest from '@/Models/Requests/UpdateTasksRequest.js';
import { Api } from '../utils/Api.js';
import { IUpdateTaskDisplayOrderRequest } from '@/Models/Requests/UpdateTaskDisplayerOrder.js';
import { LoginRequest } from '../Models/Requests/LoginRequest.js';
import { LoginResponse } from '../Models/Responses/LoginResponse.js'
import { RegisterRequest } from '../Models/Requests/RegisterRequest.js';
import { Ref } from 'vue';
import { ISwichtUserWorkModeRequest } from '@/Models/Requests/SwichtUserWorkModeRequest.js';
import { ISwichtUserWorkModeResponse } from '@/Models/Responses/SwichtUserWorkModeResponse.js';
import { GetAllMemberedGroupsRequest } from '../Models/Requests/GetAllMemberedGroup.js';
import { AllMemberedGroupResponse } from '@/Models/Responses/AllMemberedGroupResponse.js';
import { GetGroupMembersRequest } from '@/Models/Requests/GetGroupMembersRequest.js';
import { GetGroupMembersResponse } from '@/Models/Responses/GetGroupMembersResponse.js';
import { SearchUsersResponse } from '@/Models/Responses/SearchUsersResponse.js';
import { SearchUsersRequest } from '@/Models/Requests/SearchUsersRequest.js';
import { GetAccountInfoRequest } from '../Models/Requests/GetAccountInfoRequest.js';
import { GetAccountInfoResponse } from '../Models/Responses/GetAccountInfoResponse.js';  
import { UpdateProfileInfoRequest } from '@/Models/Requests/UpdateProfileInfoRequest.js';
import { GetProfileImgPathsResponse } from '../Models/Responses/GetProfileImgPathsResponse.js'
import { SyncAccountInfoRequest } from '@/Models/Requests/SyncAccountInfoRequest.js';
import { SyncAccountInfoResponse } from '../Models/Responses/SyncAccountInfoResponse.js';
import { AddGroupMemberRequest } from '@/Models/Requests/AddGroupMemberRequest.js';

export class ApiCalling {
    static async AddGroupMember(req: AddGroupMemberRequest): Promise<BaseResponse.BaseResponse> {
        const response = await Api.Post<AddGroupMemberRequest, BaseResponse.BaseResponse>('Group/add-group-member',req);
        return response;
    }
    static async SyncAccountInfo(req: SyncAccountInfoRequest): Promise<SyncAccountInfoResponse> {
        const response = await Api.Post<SyncAccountInfoRequest, SyncAccountInfoResponse>('User/sync-account-info', req);
        return response;
    }
    static async GetProfileImgPaths(): Promise<GetProfileImgPathsResponse> {
        const response = await Api.Post<{}, GetProfileImgPathsResponse>('User/get-profile-img-paths', {})
        return response;
    }
    static async UpdateProfileInfo(req: UpdateProfileInfoRequest): Promise<BaseResponse.BaseResponse | PromiseLike<BaseResponse.BaseResponse>> {
        const response = await Api.Post<UpdateProfileInfoRequest, BaseResponse.BaseResponse>('User/update-profile-info', req)
        return response;
    }
    static async GetAccountInfo(req: GetAccountInfoRequest): Promise<GetAccountInfoResponse> {
        const response = await Api.Post<GetAccountInfoRequest, GetAccountInfoResponse>('User/get-users-info', req)
        return response;
    }
    static async SearchUser(req: SearchUsersRequest): Promise<SearchUsersResponse> {
        const response = await Api.Post<SearchUsersRequest, SearchUsersResponse>('User/search-users', req);
        return response;
    }
    static async GetGroupMembers(req: GetGroupMembersRequest): Promise<GetGroupMembersResponse> {
        const response = await Api.Post<GetGroupMembersRequest, GetGroupMembersResponse>('Group/get-group-members', req);
        return response;
    }
    static async GetAllMemberedGroups(req: GetAllMemberedGroupsRequest): Promise<AllMemberedGroupResponse> {
        const response = await Api.Post<GetAllMemberedGroupsRequest, AllMemberedGroupResponse>('Group/get-all-membered-group', req);
        return response;
    }
    static async SwichtUserWorkMode(req: ISwichtUserWorkModeRequest): Promise<ISwichtUserWorkModeResponse> {
        const response = await Api.Post<ISwichtUserWorkModeRequest, ISwichtUserWorkModeResponse>('User/swicht-user-work-mode', req);
        return response;
    }
    static async Register(req: RegisterRequest): Promise<BaseResponse.BaseResponse> {
        const response = await Api.Post<RegisterRequest, BaseResponse.BaseResponse>('User/register', req);
        return response;
    }
    static async Login(req: LoginRequest): Promise<LoginResponse> {
        const response = await Api.Post<LoginRequest, LoginResponse>('User/login',req);
        return response;
    }
    static async UpdateTaskDisplayOrder(updateTaskDisplayOrderRequest: IUpdateTaskDisplayOrderRequest): Promise<BaseResponse.BaseResponse> {
        const response = await Api.Post<IUpdateTaskDisplayOrderRequest, BaseResponse.BaseResponse>('Task/update-tasks-display-order',updateTaskDisplayOrderRequest)
        return response;
    }
    static async GetTasks(getTaskRequest: GetTaskRequest.GetTaskRequest): Promise<GetTaskResopnse.GetTaskResopnse> {
        const response = await Api.Post<GetTaskRequest.GetTaskRequest,GetTaskResopnse.GetTaskResopnse>('Task/get-tasks', getTaskRequest);
        return response;
    }
    static async SetTasks(setTasksRequest: SetTasksRequest.SetTasksRequest): Promise<BaseResponse.BaseResponse> {
        const response = await Api.Post<SetTasksRequest.SetTasksRequest,BaseResponse.BaseResponse>('Task/set-tasks', setTasksRequest);
        return response;
    }
    static async UpdateTask(updateTasksRequest: UpdateTasksRequest.UpdateTasksRequest): Promise<BaseResponse.BaseResponse> {
        const response = await Api.Post<UpdateTasksRequest.UpdateTasksRequest,BaseResponse.BaseResponse>('Task/update-tasks', updateTasksRequest);
        return response;
    }
}