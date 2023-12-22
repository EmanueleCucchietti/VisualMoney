CREATE PROCEDURE [dbo].[spGetTransactionsLoadAllDataWithFilters]
    @IdUser INT,
    @IdCategory INT,
    @IdCounterParty INT,
    @IdWallet INT,
    @IdTransaction INT
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
        counterparty.Id,
        counterparty.[Name],
        counterparty.IsHidden
    FROM [Transaction] t
    LEFT JOIN CategoryTransaction ct ON ct.IdTransaction = t.Id
    LEFT JOIN Category cat ON cat.Id = ct.IdCategory
    LEFT JOIN CounterpartyTransaction cpt ON cpt.IdTransaction = t.Id
    LEFT JOIN CounterParty counterparty ON counterparty.Id = cpt.IdCounterParty
    WHERE 
        t.IdUser = @IdUser AND
		(@IdCategory IS NULL OR cat.Id = @IdCategory) AND
		(@IdCounterParty IS NULL OR counterparty.Id = @IdCounterParty) AND
		(@IdWallet IS NULL OR t.IdWallet = @IdWallet) AND
        (@IdTransaction IS NULL OR t.Id = @IdTransaction)
END