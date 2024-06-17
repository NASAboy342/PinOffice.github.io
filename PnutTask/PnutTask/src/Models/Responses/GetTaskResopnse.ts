import { EnumTaskStatus } from '@/Models/Requests/GetTaskRequest.ts';
import * as BaseResponse from '../Models/BaseResponse.ts';

export interface GetTaskResopnse extends BaseResponse.BaseResponse{
    tasks: TaskInfo[]
}

export interface TaskInfo {
    id: number,
    title: string,
    description: string,
    enumTaskStatus: EnumTaskStatus,
    status: string,
    dueOn: Date,
    createdOn: Date,
    modifyOn: Date
}