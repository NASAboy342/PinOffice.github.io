CREATE PROCEDURE [dbo].[Pnut_SetTasks]
    @userId INT = 1,
	@title NVARCHAR(100),
    @description NVARCHAR(MAX),
    @status INT,
    @priority INT,
    @createdOn DATETIME,
    @dueOn DATETIME,
    @modifyOn DATETIME
AS
BEGIN
    DECLARE @hiestPriority INT = 1;
	SELECT TOP 1 @hiestPriority = [Priority] FROM [dbo].[Task] WITH (NOLOCK) ORDER BY [Priority] DESC
    INSERT INTO [dbo].[Task] 
    ( 
        [UserId],
        [Title], 
        [Description], 
        [Status], 
        [Priority], 
        [CreatedOn], 
        [ModifyOn], 
        [DueOn]
     )
     VALUES
     (
        @userId,
        @title,
        @description,
        @status,
        @hiestPriority,
        @createdOn,
        @modifyOn,
        @dueOn
     )

     SELECT 0 AS ErrorCode, 'Success' AS ErrorMessage
END
