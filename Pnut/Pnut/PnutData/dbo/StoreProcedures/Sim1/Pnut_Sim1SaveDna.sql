CREATE PROCEDURE [dbo].[Pnut_Sim1SaveDna]
	@dna [dbo].[DnaType] READONLY,
	@energyRecord  DECIMAL(19,6),
	@ageInSec INT,
	@finalEnergy DECIMAL(19,6),
	@reproductionCount INT,
	@isFemale BIT,
	@colorRGB NVARCHAR(200)
AS
BEGIN
	SET NOCOUNT ON

	DECLARE @lastGeneration INT = 0;
	SELECT TOP 1 @lastGeneration = [Generation] FROM [dbo].[Dna] WITH(NOLOCK) ORDER BY [Generation] DESC

	BEGIN TRANSACTION

	INSERT INTO [dbo].[Dna] 
	(
		[Generation],
		[Value],
		[CreatedOn]
	)
	SELECT
		@lastGeneration + 1,
		[Value],
		GETDATE()
	FROM @dna

	INSERT INTO [dbo].[BestCellRecord]
	(
		[EnergyRecord],
		[Generation],
		[AgeInSec],
		[FinalEnergy],
		[ReproductionCount],
		[IsFemale],
		[ColorRGB]
	)
	VALUES
	(
		@energyRecord ,
		@lastGeneration + 1,
		@ageInSec,
		@finalEnergy,
		@reproductionCount,
		@isFemale,
		@colorRGB
	)

	IF(@@ERROR != 0)
	BEGIN
		ROLLBACK TRANSACTION
		SELECT 1 AS ErrorCode, 'General Error' AS ErrorMessage
	END

	COMMIT TRANSACTION
	SELECT 0 AS ErrorCode, 'Success' AS ErrorMessage
END
