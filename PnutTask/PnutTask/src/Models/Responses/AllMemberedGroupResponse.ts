export interface Group{
    groupId: number,
    name: string,
    description: string,
    joinOn: string,
    position: string
}

export interface AllMemberedGroupResponse{
    memberedGroups: Array<Group>
}