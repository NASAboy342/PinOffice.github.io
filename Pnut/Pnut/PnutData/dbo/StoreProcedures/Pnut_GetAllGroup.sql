CREATE PROCEDURE [dbo].[Pnut_GetAllGroup]
	@userId INT
AS
BEGIN
	SET NOCOUNT ON

	SELECT
		gm.[GroupId],
		g.[Name],
		g.[Description],
		gm.[CreatedOn] AS [JoinOn],
		gm.[UserPosition] AS [Position]
	FROM [dbo].[GroupMember] gm WITH(NOLOCK)
	INNER JOIN [dbo].[Group] g WITH(NOLOCK)
	ON gm.GroupId = g.Id
	WHERE gm.UserId = @userId
END