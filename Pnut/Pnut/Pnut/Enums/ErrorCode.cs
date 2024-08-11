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
    }
}
