CREATE TYPE [dbo].[UpdateTaskRequest] AS TABLE
(
	Userid INT,
    Id INT,
    Title NVARCHAR(100),
    Description NVARCHAR(MAX),
    Status INT,
    Priority INT,
    DueOn DATETIME,
    ModifyOn DATETIME
)