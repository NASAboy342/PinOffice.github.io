export enum EnumTaskStatus{
    Todo = 0,
    InProgress = 1,
    Pending = 2,
    Done = 3,
    Delete = 4,
    Failed = 5
};

export interface GetTaskRequest{
    UserId: number,
    IsGetAllStatus: boolean,
    Status: EnumTaskStatus,
    IsGetAllDate: boolean,
    StartDate: Date,
    EndDate: Date
};
