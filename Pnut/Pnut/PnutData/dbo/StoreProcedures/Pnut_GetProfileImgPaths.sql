CREATE PROCEDURE [dbo].[Pnut_GetProfileImgPaths]
AS
BEGIN
	SET NOCOUNT ON
	SELECT [Id], [Path], [IsInitByScript] FROM [ProfileImgPath] WITH(NOLOCK)
END
