CREATE PROCEDURE [dbo].[spGetCategoriesLoadAllData]
	@IdUser INT
AS
BEGIN
    SELECT c.[Id], 
        c.[Name], 
        c.[IdSuperCategory], 
        c.[IdUser],
	    t.Id,
	    t.[Name],
	    t.[Date],
	    t.Amount,
	    t.CurrencyCode,
	    t.IsIncome,
	    t.IdWallet
    FROM [dbo].[Category] c
    INNER JOIN CategoryTransaction ct ON ct.IdCategory = c.Id
    INNER JOIN [Transaction] t ON t.Id = ct.IdTransaction
    WHERE c.[IdUser] = @IdUser
END