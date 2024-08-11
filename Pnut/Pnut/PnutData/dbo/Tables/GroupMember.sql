CREATE TABLE [dbo].[GroupMember]
(
	[GroupId] INT,
	[UserId] INT,
	[UserPosition] NVARCHAR(50) NOT NULL,
	[CreatedOn] DATETIME,
	[CreatedBy] NVARCHAR(100),
	[ModifiedOn] DATETIME,
	[ModifiedBy] NVARCHAR(100),
	CONSTRAINT [CK_UserPosition] CHECK ([UserPosition] IN ('Admin','Member'))
)
