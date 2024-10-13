CREATE PROCEDURE [dbo].[Pnut_GetUsersInfo]
	@id INT 
AS
BEGIN
	SET NOCOUNT ON
	SELECT
	[UserName] AS [Name],
	[Id],
	[ProfilePicturePath] AS [ProfilePicturePath]
	FROM [dbo].[User] WITH(NOLOCK)
	WHERE [Id] = @id
END
