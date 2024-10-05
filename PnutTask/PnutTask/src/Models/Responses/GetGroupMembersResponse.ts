export interface GroupMember {
    img: string;
    id: number;
    name: string;
    position: string;
  }

export interface GetGroupMembersResponse{
    groupMembers: GroupMember[];
}