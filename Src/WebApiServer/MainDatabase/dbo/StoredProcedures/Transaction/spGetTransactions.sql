CREATE PROCEDURE [dbo].[spGetTransactions]
	@IdUser INT
AS
BEGIN
	SELECT [Id], 
        [Name],
        [Amount],
        [CurrencyCode],
        [IsIncome],
        [IdWallet],
        [IdUser]
	FROM [dbo].[Transaction]
	WHERE [IdUser] = @IdUser
END