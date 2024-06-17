CREATE PROCEDURE [dbo].[Pnut_UpdateTasks]
	@userid INT,
    @id INT,
    @title NVARCHAR(100),
    @description NVARCHAR(MAX),
    @enumTaskStatus INT,
    @dueOn DATETIME,
    @modifyOn DATETIME
AS
BEGIN
    UPDATE [dbo].[Task]
    SET [Title] = @title,
        [Description] = @description,
        [Status] = @enumTaskStatus,
        [DueOn] = @dueOn,
        [ModifyOn] = ISNULL(@modifyOn,GETDATE())
    WHERE [UserId] = @userid AND [Id] = @id

    SELECT 0 AS ErrorCode, 'Success' AS ErrorMessage
END
