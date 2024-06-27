CREATE PROCEDURE [dbo].[Pnut_UpdateTasksDisplayOrder]
	@tasksDisplayOrder AS [dbo].[TaskDisplayOrder] READONLY
AS
BEGIN
    SET NOCOUNT ON;

    MERGE [dbo].[Task] AS T
    USING @tasksDisplayOrder AS S
    ON T.Id = S.TaskId
    WHEN MATCHED THEN
    UPDATE SET 
        T.Priority = S.Priority;

    SELECT 0 AS Errorcode, 'Success' AS ErrorMessage
END
