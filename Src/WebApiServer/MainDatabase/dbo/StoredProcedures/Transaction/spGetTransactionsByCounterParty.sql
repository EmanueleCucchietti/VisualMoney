CREATE PROCEDURE [dbo].[spGetTransactionsByCounterParty]
    @IdCounterParty INT,
    @IdUser INT
AS
BEGIN 
    SELECT [T].[Id], [Name], [Date], [Amount], [CurrencyCode], [IsIncome], [IdWallet]
	FROM [Transaction] T
	INNER JOIN [CounterPartyTransaction] cpt
		ON cpt.IdTransaction = t.Id
	WHERE [cpt].[IdCounterParty] = @IdCounterParty AND [t].[IdUser] = @IdUser
END