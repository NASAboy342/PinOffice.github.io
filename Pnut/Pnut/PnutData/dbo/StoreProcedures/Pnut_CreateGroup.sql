CREATE PROCEDURE [dbo].[Pnut_CreateGroup]
	@groupName NVARCHAR(100),
	@groupDescription NVARCHAR(MAX),
	@creatorUserId INT
AS
BEGIN
	SET NOCOUNT ON

	DECLARE @createdUserName NVARCHAR(100) = (SELECT TOP 1 [UserName] FROM [dbo].[User] WHERE [Id] = @creatorUserId)

    IF @createdUserName IS NULL
    BEGIN
		SELECT 2 AS ErrorCode, 'User not exist' AS ErrorMessage
		RETURN
	END

	BEGIN TRANSACTION
	INSERT INTO [dbo].[Group] 
	(
		[Name],
		[Description],
		[CreatedOn],
		[CreatedBy],
		[ModifiedOn],
        [ModifiedBy]
    )
	VALUES
	(
		@groupName,
		@groupDescription,
		GETDATE(),
        @createdUserName,
        GETDATE(),
        @createdUserName
    )

	DECLARE @createdGroupId INT = SCOPE_IDENTITY();

	INSERT INTO [dbo].[GroupMember]
	(
		[UserId],
		[UserPosition],
		[GroupId],
		[CreatedOn],
		[CreatedBy],
		[ModifiedOn],
		[ModifiedBy]
	)
	VALUES
    (
        @creatorUserId,
        'Admin',
        @createdGroupId,
        GETDATE(),
        @createdUserName,
        GETDATE(),
        @createdUserName
    )

	IF(@@ERROR <> 0)
	BEGIN
		SELECT 6 AS ErrorCode, 'Unable to create group' AS ErrorMessage
		ROLLBACK TRANSACTION
        RETURN	
	END
	
	COMMIT TRANSACTION
	SELECT 0 AS ErrorCode, 'Success' AS ErrorMessage
END
