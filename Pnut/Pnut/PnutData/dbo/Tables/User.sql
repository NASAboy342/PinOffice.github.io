CREATE TABLE [dbo].[User]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY (1,1),
	[UserName] NVARCHAR (100),
	[Password] NVARCHAR (100),
	[UserType] INT,
	[ProfilePicturePath] NVARCHAR (MAX)
)
