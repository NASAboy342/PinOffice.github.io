CREATE PROCEDURE [dbo].[Pnut_GetGroupTask]
	@groupId INT,
	@userId INT,
	@sprintId INT,
	@scenarioId INT,
	@taskId INT
AS
BEGIN
	SET NOCOUNT ON

	SELECT
	[Id],
	[ScenarioId],
	[Title],
	[Description],
	[Priority],
	[Status],
	[AssignedTo],
	[CreatedOn],
	[ModifiedOn],
	[CreatedBy],
	[ModifiedBy]
	FROM [dbo].[ScenarioTask] WITH(NOLOCK)
	WHERE [ScenarioId] = @scenarioId

END
