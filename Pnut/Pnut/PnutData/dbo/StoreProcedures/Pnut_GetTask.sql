CREATE PROCEDURE [dbo].[Pnut_GetTask]
	@userId INT,
	@isGetAllStatus BIT,
	@status INT,
	@isGetAllDate BIT,
	@startDate DATETIME,
	@endDate DATETIME
AS
BEGIN
	SET NOCOUNT ON

	DECLARE @deleteStatus INT = 4;
    
	SELECT  [Id], 
				[Title], 
				[Description], 
				[Status] AS EnumTaskStatus, 
				[DueOn], 
				[CreatedOn], 
				[ModifyOn]
	FROM [dbo].[Task] WITH(NOLOCK)
	WHERE UserId = @userId
	AND (
			(@isGetAllStatus = 1 AND [Status] != @deleteStatus) 
			OR 
			([Status] = @status)
		)
	AND (@isGetAllDate = 1 OR [CreatedOn] BETWEEN @startDate AND @endDate)
	ORDER BY [Priority] DESC
END