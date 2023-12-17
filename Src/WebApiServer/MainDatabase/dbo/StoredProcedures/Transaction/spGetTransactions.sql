CREATE PROCEDURE [dbo].[spGetTransactions]
	@IdUser INT
AS
BEGIN
	SELECT [Id], 
        [Name],
        [Amount],
        [CurrencyCode],
        [Date],
        [IsIncome],
        [IdWallet],
        [IdUser]
	FROM [dbo].[Transaction]
	WHERE [IdUser] = @IdUser
END