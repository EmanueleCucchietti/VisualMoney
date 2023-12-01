CREATE PROCEDURE [dbo].[spGetCounterPartiesByTransaction]
	@IdTransaction INT,
    @IdUser INT
AS
BEGIN
    SELECT [Id], [Name], [IsHidden], [IdUser]
    FROM [dbo].[CounterParty]
    WHERE [IdUser] = @IdUser AND Id IN (
		SELECT [id]
		FROM [CounterpartyTransaction]
		WHERE [IdTransaction] = @IdTransaction
	)
END