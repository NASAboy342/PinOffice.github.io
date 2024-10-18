import { EnumGroupPosition } from '../Enums/EnumGroupPosition.js';

export interface AddGroupMemberRequest{
    groupId: number,
    userId: number,
    userPosition: EnumGroupPosition,
    inviterUserId: number,

}