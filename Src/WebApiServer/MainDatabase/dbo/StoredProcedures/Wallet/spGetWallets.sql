CREATE PROCEDURE [dbo].[spGetWallets]
	@IdUser INT
AS
BEGIN
	SELECT [Id], [Name], [Amount], [CurrencyCode], [IdUser]
	FROM [dbo].[Wallet]
	WHERE [IdUser] = @IdUser
END