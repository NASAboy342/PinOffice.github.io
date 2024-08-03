CREATE PROCEDURE [dbo].[Pnut_SwichtUserWorkMode]
	@userId INT,
	@workMode NVARCHAR(100)
AS
BEGIN
	SET NOCOUNT ON

	IF NOT EXISTS (SELECT TOP 1 1 FROM [dbo].[User] WHERE [Id] = @userId)
	BEGIN
		SELECT 2 AS ErrorCode, 'User Does Not Exist' AS ErrorMessage
		RETURN
	END

	UPDATE [dbo].[User]
	SET	[WorkMode] = @workMode
	WHERE [Id] = @userId

	SELECT 0 AS ErrorCode, 'User work mode swicht to ' + @workMode + ' successfully' AS ErrorMessage
END
