CREATE PROCEDURE [dbo].[Pnut_Register]
	@username NVARCHAR(100),
	@password NVARCHAR(100)
AS
BEGIN
	SET NOCOUNT ON

	--if username already exists
    IF EXISTS (SELECT 1 FROM [dbo].[User] WHERE Username = @username)
    BEGIN
        SELECT 4 AS ErrorCode, 'User already exist' AS ErrorMessage
        RETURN
    END
    DECLARE @normalUser INT = 1;
    --insert new user
    INSERT INTO [dbo].[User] ([Username], [Password], [UserType], [ProfilePicturePath])
    VALUES (@username, @password, @normalUser, '')

    SELECT 0 AS ErrorCode, 'Success' AS ErrorMessage
    
END