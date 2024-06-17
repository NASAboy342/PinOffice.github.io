import { EnumTaskStatus } from './GetTaskRequest';

export interface UpdateTasksRequest{
    userId: number,
    id: number,
    title: string,
    description: string,
    enumTaskStatus: EnumTaskStatus,
    dueOn: Date,
    modifyOn: Date,
};