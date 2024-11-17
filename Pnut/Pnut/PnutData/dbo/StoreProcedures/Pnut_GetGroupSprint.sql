CREATE PROCEDURE [dbo].[Pnut_GetGroupSprint]
	@groupId INT,
	@userId INT
AS
BEGIN
	SET NOCOUNT ON
	SELECT
		[Id] AS [Id],
		[Date] AS [Date],
		[Status] AS [Status],
		[Remark] AS [Remark],
		[CreatedOn] AS [CreatedOn],
		[ModifiedOn] AS [ModifiedOn],
		[CreatedBy] AS [CreatedBy],
		[ModifiedBy] AS [ModifiedBy],
		[GroupId] AS [GroupId]
	FROM [dbo].[GroupSprint] WITH(NOLOCK)
	WHERE [GroupId] = @groupId
END
