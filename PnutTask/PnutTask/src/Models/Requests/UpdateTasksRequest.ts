import { EnumTaskStatus } from '@/Models/Requests/GetTaskRequest.js';

export interface UpdateTasksRequest{
    userId: number,
    id: number,
    title: string,
    description: string,
    enumTaskStatus: EnumTaskStatus,
    dueOn: Date,
    modifyOn: Date,
};