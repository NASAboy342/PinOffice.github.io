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

export class ApiCalling {
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