CREATE PROCEDURE [dbo].[spUpdateCounterParty]
    @Id INT,
    @Name NVARCHAR(50),
    @IsHidden BIT
AS
BEGIN
    UPDATE [dbo].[CounterParty]
    SET [Name] = @Name, [IsHidden] = @IsHidden
    WHERE [Id] = @Id
END
