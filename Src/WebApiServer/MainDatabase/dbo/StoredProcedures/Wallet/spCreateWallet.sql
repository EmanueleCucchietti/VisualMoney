CREATE PROCEDURE [dbo].[spCreateWallet]
	@Name NVARCHAR(50),
	@Amount MONEY,
	@CurrencyCode NCHAR(3),
	@IdUser INT
AS
BEGIN
	INSERT INTO [dbo].[Wallet] ([Name], [Amount], [CurrencyCode], [IdUser])
	VALUES (@Name, @Amount, @CurrencyCode, @IdUser)
END