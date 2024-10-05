CREATE TABLE [dbo].[User]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY (1,1),
	[UserName] NVARCHAR (100),
	[Password] NVARCHAR (100),
	[UserType] INT,
	[ProfilePicturePath] NVARCHAR (MAX),
	[WorkMode] NVARCHAR (100) NOT NULL DEFAULT('Individual'),
	[ImgUrl] NVARCHAR (MAX) DEFAULT('') NOT NULL,
	CONSTRAINT CK_WorkMode CHECK ([WorkMode] IN ('Individual', 'Cooperate'))
)
