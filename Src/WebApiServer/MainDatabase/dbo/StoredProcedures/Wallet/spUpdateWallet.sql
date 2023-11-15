CREATE PROCEDURE [dbo].[spUpdateWallet]
	@Id INT,
	@Name NVARCHAR(50),
	@Amount MONEY,
	@CurrencyCode NCHAR(3)
AS
BEGIN
	UPDATE [dbo].[Wallet]
	SET [Name] = @Name, [Amount] = @Amount, [CurrencyCode] = @CurrencyCode
	WHERE [Id] = @Id
END