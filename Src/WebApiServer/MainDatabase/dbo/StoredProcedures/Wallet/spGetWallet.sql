CREATE PROCEDURE [dbo].[spGetWallet]
	@WalletId INT
AS
BEGIN
	SELECT [Id], [Name], [Amount], [CurrencyCode], [IdUser]
	FROM [dbo].[Wallet]
	WHERE [Id] = @WalletId
END