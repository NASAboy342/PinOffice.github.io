CREATE TABLE [dbo].[BestCellRecord]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY (1,1),
	[EnergyRecord] DECIMAL(19,6),
	[Generation] INT,
	[AgeInSec] INT,
	[FinalEnergy] DECIMAL(19,6),
	[ReproductionCount] INT,
	[IsFemale] BIT,
	[ColorRGB] NVARCHAR(200),
	[CreatedOn] DATETIME DEFAULT(GETDATE())
)
