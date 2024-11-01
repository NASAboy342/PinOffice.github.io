CREATE PROCEDURE [dbo].[Pnut_GetGroupMembers]
	@groupId INT
AS
BEGIN
	SET NOCOUNT ON
	SELECT 
	u.[ProfilePicturePath] AS [Img],
	u.[Id] AS [Id],
	u.[UserName] AS [Name],
	gm.[UserPosition] AS [Position]
	FROM [dbo].[GroupMember] gm WITH(NOLOCK)
	INNER JOIN [dbo].[User] u WITH(NOLOCK)
	ON gm.UserId = u.Id
	WHERE gm.[GroupId] = @groupId
END
