CREATE PROCEDURE [dbo].[Pnut_GetSprintScenario]
	@sprintId INT,
	@userId INT
AS
BEGIN
	SET NOCOUNT ON
	SELECT
		[Id] AS [Id],
		[SprintId] AS [SprintId],
		[Title] AS [Title],
		[Status] AS [Status],
		[Priority] AS [Priority],
		[CreatedOn] AS [CreatedOn],
		[ModifiedOn] AS [ModifiedOn],
		[CreatedBy] AS [CreatedBy],
		[ModifiedBy] AS [ModifiedBy]
	FROM [dbo].[SprintScenario] WITH(NOLOCK)
	WHERE [SprintId] = @sprintId

END