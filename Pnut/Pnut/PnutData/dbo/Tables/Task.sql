﻿CREATE TABLE [dbo].[Task]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY (1,1),
	[UserId] INT NOT NULL,
	[Title] NVARCHAR(100) DEFAULT('Undefined'),
	[Description] NVARCHAR(MAX) DEFAULT(''),
	[Status] INT DEFAULT(0),
    [Priority] INT DEFAULT(1),
	[CreatedOn] DATETIME DEFAULT(GETDATE()),
    [DueOn] DATETIME DEFAULT(GETDATE()),
	[ModifyOn] DATETIME DEFAULT(GETDATE()),
)