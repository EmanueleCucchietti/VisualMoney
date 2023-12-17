CREATE PROCEDURE [dbo].[spGetTransaction]
	@Id INT,
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
	WHERE [IdUser] = @IdUser AND [Id] = @Id
END