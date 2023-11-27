CREATE PROCEDURE [dbo].[spCreateTransaction]
	@Name NVARCHAR(50),
	@Amount MONEY,
	@CurrencyCode NVARCHAR(3),
	@Date DATETIME,
	@IsIncome BIT,
	@IdWallet INT,
	@IdUser INT
AS
BEGIN
	INSERT INTO [dbo].[Transaction] ([Name], [Amount], [CurrencyCode], [Date], [IsIncome], [IdWallet], [IdUser])
	VALUES (@Name, @Amount, @CurrencyCode, @Date, @IsIncome, @IdWallet, @IdUser)
END