import * as GetTaskRequest from '../Models/Requests/GetTaskRequest.ts';
import * as GetTaskResopnse from '../Models/Responses/GetTaskResopnse.ts';
import * as SetTasksRequest from '@/Models/Responses/SetTasksRequest.ts';
import * as BaseResponse from '../Models/BaseResponse.ts';
import * as UpdateTasksRequest from '@/Models/Requests/UpdateTasksRequest.ts';
import { Api } from '../utils/Api.ts';
import { IUpdateTaskDisplayOrderRequest } from '@/Models/Requests/UpdateTaskDisplayerOrder.js';

export class ApiCalling {
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
        const response = await Api.Post<SetTasksRequest.SetTasksRequest,BaseResponse.BaseResponse>('Task/update-tasks', updateTasksRequest);
        return response;
    }
}