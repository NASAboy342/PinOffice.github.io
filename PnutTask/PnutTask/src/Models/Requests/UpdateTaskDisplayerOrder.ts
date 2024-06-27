
export interface ITaskDisplayOrder{
    TaskId: number,
    Priority: number
}
export interface IUpdateTaskDisplayOrderRequest{
    TaskDisplayOrders: ITaskDisplayOrder[]
}