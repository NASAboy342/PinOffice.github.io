CREATE PROCEDURE [dbo].[Pnut_AddGroupMember]
	@groupId INT,
	@userId INT,
	@userPosition NVARCHAR(100),
	@inviterUserId INT
AS
BEGIN
	SET NOCOUNT ON

	IF NOT EXISTS (SELECT TOP 1 1 FROM [dbo].[User] WHERE [Id] = @userId)
	BEGIN
		SELECT 2 AS ErrorCode, 'User not exist' AS ErrorMessage
		RETURN
	END

	IF NOT EXISTS (SELECT TOP 1 1 FROM [dbo].[User] WHERE [Id] = @inviterUserId)
	BEGIN
		SELECT 9 AS ErrorCode, 'Inviter does not exist' AS ErrorMessage
		RETURN
	END

	IF NOT EXISTS (SELECT TOP 1 1 FROM [dbo].[GroupMember] WHERE [UserId] = @inviterUserId AND [UserPosition] = 'Admin')
	BEGIN
		SELECT 13 AS ErrorCode, 'Inviter does not have permission to add members' AS ErrorMessage
		RETURN
	END

	IF EXISTS (SELECT TOP 1 1 FROM [dbo].[GroupMember] WHERE [UserId] = @userId)
	BEGIN
		SELECT 10 AS ErrorCode, 'User is already a member of the group' AS ErrorMessage
		RETURN
	END

	IF NOT EXISTS (SELECT TOP 1 1 FROM [dbo].[Group] WHERE [id] = @groupId)
	BEGIN
		SELECT 16 AS ErrorCode, 'Group does not exist' AS ErrorMessage
		RETURN
	END

	INSERT INTO [dbo].[GroupMember]
	(
		[GroupId],
		[UserId],
		[UserPosition],
		[CreatedBy],
		[CreatedOn],
		[ModifiedBy],
		[ModifiedOn]
	)
	VALUES 
	(
		@groupId,
        @userId,
        @userPosition,
        @inviterUserId,
        GETDATE(),
        @inviterUserId,
        GETDATE()
    )	

	SELECT 0 AS ErrorCode, 'Group member added successfully' AS ErrorMessage;
END
