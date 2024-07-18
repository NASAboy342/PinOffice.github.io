CREATE PROCEDURE [dbo].[Pnut_Login]
	@username NVARCHAR(100),
	@password NVARCHAR(100)
AS
BEGIN
	SET NOCOUNT ON

	--is user not exist
	IF NOT EXISTS (SELECT TOP 1 1 FROM [dbo].[User] WHERE [UserName] = @username)
	BEGIN
		SELECT 2 AS ErrorCode, 'UserDoesNotExist' AS ErrorMessage
		RETURN
	END

	--is not correct password
	IF NOT EXISTS (SELECT TOP 1 1 FROM [dbo].[User] WHERE [UserName] = @username AND [Password] = @password)
	BEGIN
		SELECT 3 AS ErrorCode, 'IncorrectPassword' AS ErrorMessage
		RETURN
	END

	DECLARE @onlineId INT = 1;

	SELECT [UserName] AS [Name], [Id], @onlineId, [UserType] AS [EnumUserType], [ProfilePicturePath] FROM [User] WHERE [UserName] = @username AND [Password] = @password
END
