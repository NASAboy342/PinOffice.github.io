export enum EnumUserType{
    Admin = 0,
    User = 1,
}

export interface User{
    name: string,
    id: number,
    onlineId: number,
    enumUserType: EnumUserType,
    profilePicturePath?: string,
}