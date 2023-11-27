CREATE PROCEDURE [dbo].[spGetWallet]
	@WalletId INT,
	@IdUser INT
AS
BEGIN
	SELECT [Id], [Name], [Amount], [CurrencyCode], [IdUser]
	FROM [dbo].[Wallet]
	WHERE [Id] = @WalletId AND [IdUser] = @IdUser
END