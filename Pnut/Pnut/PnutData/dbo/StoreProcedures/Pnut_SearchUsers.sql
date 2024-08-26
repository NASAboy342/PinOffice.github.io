CREATE PROCEDURE [dbo].[Pnut_SearchUsers]
	@userName NVARCHAR(100),
	@isById BIT
AS
BEGIN
	SET NOCOUNT ON

	SELECT
		[UserName] AS [Name],
		[Id],
		[ProfilePicturePath]
	FROM [dbo].[User] WITH(NOLOCK)
	WHERE (@isById = 1 AND [Id] = CAST(@userName AS INT))
	OR [UserName] = @userName

END
