CREATE PROCEDURE [dbo].[spGetCounterParties]
    @IdUser INT
AS
BEGIN
    SELECT [Id], [Name], [IsHidden], [IdUser]
    FROM [dbo].[CounterParty]
    WHERE [IdUser] = @IdUser
END