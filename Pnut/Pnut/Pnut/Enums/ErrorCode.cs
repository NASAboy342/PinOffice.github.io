﻿using System.ComponentModel;

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
    }
}
