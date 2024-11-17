/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/


DECLARE @profileImgPath AS TABLE 
(
	[Path] NVARCHAR(MAX) NOT NULL,
	[IsInitByScript] BIT
)

INSERT INTO @profileImgPath ([Path], [IsInitByScript])
VALUES
(N'\img\06.png',1),
(N'\img\07.png',1),
(N'\img\08.png',1),
(N'\img\09.png',1),
(N'\img\10.png',1),
(N'\img\11.png',1),
(N'\img\12.png',1),
(N'\img\13.png',1),
(N'\img\14.png',1),
(N'\img\15.png',1),
(N'\img\16.png',1),
(N'\img\17.png',1),
(N'\img\18.png',1),
(N'\img\19.png',1),
(N'\img\20.png',1),
(N'\img\21.png',1),
(N'\img\22.png',1),
(N'\img\23.png',1),
(N'\img\24.png',1),
(N'\img\25.png',1),
(N'\img\26.png',1),
(N'\img\27.png',1),
(N'\img\28.png',1),
(N'\img\29.png',1),
(N'\img\30.png',1),
(N'\img\31.png',1)

DELETE [ProfileImgPath]
WHERE [IsInitByScript] = 1

INSERT INTO [ProfileImgPath] ([Path], [IsInitByScript])
SELECT [Path], [IsInitByScript] FROM @profileImgPath