CREATE PROCEDURE [dbo].[spGetTransactionsByCategory]
    @IdCategory INT,
    @IdUser INT
AS
BEGIN
    SELECT [T].[Id], [Name], [Date], [Amount], [CurrencyCode], [IsIncome], [IdWallet]
    FROM [Transaction] T
    INNER JOIN [CategoryTransaction] ct
        ON ct.IdTransaction = t.Id
    WHERE [ct].[IdCategory] = @IdCategory AND [t].[IdUser] = @IdUser
END