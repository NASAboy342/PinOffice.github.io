CREATE TABLE [dbo].[Group]
(
	[Id] INT PRIMARY KEY IDENTITY (1,1),
	[Name] VARCHAR(255) NOT NULL,
	[Description] VARCHAR(MAX) NULL,
    [CreatedOn] DATETIME,
	[CreatedBy] VARCHAR(255) NULL,
    [ModifiedOn] DATETIME,
	[ModifiedBy] VARCHAR(255) NULL
)
