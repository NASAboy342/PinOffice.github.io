CREATE PROCEDURE [dbo].[Pnut_UpdateProfileInfo]
	@id INT,
	@name NVARCHAR(200),
	@profilePicturePath NVARCHAR(MAX)
AS
BEGIN
	SET NOCOUNT ON
	IF EXISTS (SELECT TOP 1 1 FROM [dbo].[User] WHERE [UserName] = @name AND [Id] <> @id)
	BEGIN
		SELECT 18 AS ErrorCode, 'Username is taken' AS ErrorMessage
		RETURN
	END

	UPDATE [dbo].[User]
	SET UserName = @name,
		ProfilePicturePath = @profilePicturePath
	WHERE [Id] = @id

	SELECT 0 AS ErrorCode, 'Success' AS ErrorMessage
END
