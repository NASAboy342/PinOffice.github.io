CREATE PROCEDURE [dbo].[Pnut_SetTasks]
	@title NVARCHAR(100),
	@description NVARCHAR(MAX),
	@status INT,
	@priority INT,
	@createdOn DATETIME,
	@dueOn,
	@modifyOn
AS
	SELECT @param1, @param2
RETURN 0
