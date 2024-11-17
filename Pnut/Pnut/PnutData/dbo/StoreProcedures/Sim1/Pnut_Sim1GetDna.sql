CREATE PROCEDURE [dbo].[Pnut_Sim1GetDna]
	@isGetAll BIT,
	@generation INT
AS
BEGIN
	SET NOCOUNT ON

	DECLARE @bestCellForTheLast20Gen AS TABLE 
	(
		[Id] INT, 
		[EnergyRecord] DECIMAL(19,6),
		[Generation] INT,
		[AgeInSec] INT,
		[FinalEnergy] DECIMAL(19,6),
		[ReproductionCount] INT,
		[IsFemale] BIT,
		[ColorRGB] NVARCHAR(200)
	)

	INSERT INTO @bestCellForTheLast20Gen
	(
		[Id],
		[EnergyRecord],
		[Generation],
		[AgeInSec],
		[FinalEnergy],
		[ReproductionCount],
		[IsFemale],
		[ColorRGB]
	)
	SELECT TOP 20
	[Id],
	[EnergyRecord],
	[Generation],
	[AgeInSec],
	[FinalEnergy],
	[ReproductionCount],
	[IsFemale],
	[ColorRGB]
	FROM [dbo].[BestCellRecord] WITH(NOLOCK)
	ORDER BY [Generation] DESC
	
	DECLARE @lastGeneration INT
	SELECT TOP 1 @lastGeneration = [Generation] 
	FROM @bestCellForTheLast20Gen
	ORDER BY [ReproductionCount] DESC, [EnergyRecord] DESC, [AgeInSec] DESC

	SELECT
	[Id],
	[Generation],
	[Value],
	[CreatedOn]
	FROM [dbo].[Dna] WITH(NOLOCK)
	WHERE [Generation] = @lastGeneration

END
