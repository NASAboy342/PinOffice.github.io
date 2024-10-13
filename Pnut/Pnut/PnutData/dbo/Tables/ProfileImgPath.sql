CREATE TABLE [dbo].[ProfileImgPath]
(
	[Id] INT PRIMARY KEY IDENTITY (1,1),
	[Path] NVARCHAR(MAX) NOT NULL,
	[IsInitByScript] BIT,
)
