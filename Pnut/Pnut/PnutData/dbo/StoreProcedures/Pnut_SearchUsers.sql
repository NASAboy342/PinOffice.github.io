CREATE PROCEDURE [dbo].[Pnut_SearchUsers]
	@userName NVARCHAR(100),
	@id INT
AS
BEGIN
	SET NOCOUNT ON

	DECLARE @searchResult AS TABLE ([Name] NVARCHAR(200), [Id] INT, [ProfilePicturePath] NVARCHAR(MAX))

	INSERT INTO @searchResult ([Name], [Id], [ProfilePicturePath])
	SELECT
		[UserName] AS [Name],
		[Id],
		[ProfilePicturePath]
	FROM [dbo].[User] WITH(NOLOCK)
	WHERE [Id] = @id
	OR [UserName] like '%'+@userName+'%'

	SELECT
	[Name],
	[Id],
	[ProfilePicturePath]
	FROM @searchResult
	GROUP BY [Name], [Id], [ProfilePicturePath]
END
