CREATE PROCEDURE [dbo].[spGetCounterParty]
    @CounterPartyId INT
AS
BEGIN
    SELECT [Id], [Name], [IsHidden], [IdUser]
    FROM [dbo].[CounterParty]
    WHERE [Id] = @CounterPartyId
END