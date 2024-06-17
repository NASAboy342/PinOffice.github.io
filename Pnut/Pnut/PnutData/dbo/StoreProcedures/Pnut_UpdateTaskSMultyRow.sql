CREATE PROCEDURE [dbo].[Pnut_UpdateTasksMultyRow]
	@updateTaskRequest AS [dbo].[UpdateTaskRequest] READONLY
AS
BEGIN
	SET NOCOUNT ON

	MERGE [dbo].[Task] AS T
	USING @updateTaskRequest AS S
	ON T.[Id] = S.[Id]
	AND T.[UserId] = S.[UserId]
	WHEN MATCHED THEN
        UPDATE SET
			[Title] = S.[Title],
            [Description] = S.[Description],
            [Status] = S.[Status],
            [Priority] = S.[Priority],
			[DueOn] = S.[DueOn],
			[ModifyOn] = GETDATE();

END
