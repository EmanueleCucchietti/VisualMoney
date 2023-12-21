CREATE PROCEDURE [dbo].[spGetTransactionsWithCategoryAndCounterParties]
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
        count.Id,
        count.[Name],
        count.IsHidden
    FROM [Transaction] t
    LEFT JOIN CategoryTransaction ct ON ct.IdTransaction = t.Id
    LEFT JOIN Category cat ON cat.Id = ct.IdCategory
    LEFT JOIN CounterpartyTransaction cpt ON cpt.IdTransaction = t.Id
    LEFT JOIN CounterParty count ON count.Id = cpt.IdCounterParty
    WHERE t.IdUser = @IdUser
END