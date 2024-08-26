using System.ComponentModel;

namespace Pnut.Enums
{
    public enum ErrorCode
    {
        [Description("Success")]
        Success = 0,
        [Description("General Error")]
        GeneralError = 1,
        [Description("User not exist")]
        UserDoesNotExist = 2,
        [Description("Incorrect password")]
        IncorrectPassword = 3,
        [Description("User already exist")]
        UserAlreadyExists = 4,
        [Description("Invalid email address")]
        InvalidEmail = 5,
        [Description("Unable to create group")]
        UnableToCreateGroup = 6,
        [Description("Unable to join group")]
        UnableToJoinGroup = 7,
        [Description("Unable to leave group")]
        UnableToLeaveGroup = 8,
        [Description("Inviter does not exist")]
        InviterDoesNotExist = 9,
        [Description("User is already a member of the group")]
        UserIsAlreadyAMember = 10,
        [Description("User is already an admin of the group")]
        UserIsAlreadyAnAdmin = 11,
        [Description("User is not a member of the group")]
        UserIsNotAdmin = 12,
        [Description("Inviter does not have permission to add members")]
        InviterDoesNotHavePermissionToAddMembers = 13,
        [Description("Unable to update group")]
        UnableToUpdateGroup = 14,
        [Description("Unable to delete group")]
        UnableToDeleteGroup = 15,
        [Description("Group does not exist")]
        GroupDoesNotExist = 16,
        UserNameIsTooLong = 17,
    }
}
