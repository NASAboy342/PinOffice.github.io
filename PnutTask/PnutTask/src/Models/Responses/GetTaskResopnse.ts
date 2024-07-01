import { EnumTaskStatus } from '@/Models/Requests/GetTaskRequest.ts';
import * as BaseResponse from '../Models/BaseResponse.ts';

//convert this to ts enum "public enum EnumDatelineCloseLevel{    Normal,    HalfTheTime,    CloseDateline}"

export enum EnumDatelineCloseLevel{
    Normal = 0,
    HalfTheTime = 1,
    CloseDateline = 2
} 

export interface TaskInfo {
    id: number,
    title: string,
    description: string,
    enumTaskStatus: EnumTaskStatus,
    priority: number,
    status: string,
    enumDatelineCloseLevel: EnumDatelineCloseLevel
    dueOn: Date,
    createdOn: Date,
    modifyOn: Date,

}

export interface GetTaskResopnse extends BaseResponse.BaseResponse{
    tasks: TaskInfo[]
}
