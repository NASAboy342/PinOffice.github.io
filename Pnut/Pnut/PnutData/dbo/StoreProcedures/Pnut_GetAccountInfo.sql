CREATE PROCEDURE [dbo].[Pnut_GetAccountInfo]
	@userId INT
AS
BEGIN
	SET NOCOUNT ON

	DECLARE @onlineId INT = 1;

	SELECT	[UserName] AS [Name],
			[Id], 
			@onlineId, 
			[UserType] AS [EnumUserType], 
			[ProfilePicturePath],
			[WorkMode] AS [WorkModeAsString]
	FROM [User] WHERE [Id] = @userId
END
