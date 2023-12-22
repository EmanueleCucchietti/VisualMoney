CREATE PROCEDURE [dbo].[spGetTransactionsLoadAllData]
	@IdUser INT
AS
BEGIN
	SELECT
	    t.Id,
	    t.[Name],
	    t.[Date],
	    t.Amount,
	    t.CurrencyCode,
	    t.IsIncome,
	    t.IdWallet,
	    cat.Id,
	    cat.[Name],
        cat.[IdSuperCategory],
        counterParty.Id,
        counterParty.[Name],
        counterParty.IsHidden
    FROM [Transaction] t
    LEFT JOIN CategoryTransaction ct ON ct.IdTransaction = t.Id
    LEFT JOIN Category cat ON cat.Id = ct.IdCategory
    LEFT JOIN CounterpartyTransaction cpt ON cpt.IdTransaction = t.Id
    LEFT JOIN CounterParty counterParty ON counterParty.Id = cpt.IdCounterParty
    WHERE t.IdUser = @IdUser
END