import { EnumTaskStatus } from '@/Models/Requests/GetTaskRequest.js';

export interface SetTasksRequest{
    userId: number,
    title: string,
    description: string,
    status: EnumTaskStatus,
    priority: number,
    dueOn: Date
}