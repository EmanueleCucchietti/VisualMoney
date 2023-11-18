CREATE PROCEDURE [dbo].[spCreateCounterParty]
    @Name NVARCHAR(50),
    @IsHidden BIT,
    @IdUser INT
AS
BEGIN
    INSERT INTO [dbo].[CounterParty] ([Name], [IsHidden], [IdUser])
    VALUES (@Name, @IsHidden, @IdUser)
END