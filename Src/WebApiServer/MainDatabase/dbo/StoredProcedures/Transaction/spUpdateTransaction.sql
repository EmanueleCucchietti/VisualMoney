CREATE PROCEDURE [dbo].[spUpdateTransaction]
	@Id INT,
	@Name NVARCHAR(50),
	@Amount MONEY,
	@CurrencyCode NVARCHAR(3),
	@Date DATETIME,
	@IsIncome BIT,
	@IdWallet INT,
	@IdUser INT
AS
BEGIN
	UPDATE [dbo].[Transaction]
	SET [Name] = @Name,
		[Amount] = @Amount,	 
		[CurrencyCode] = @CurrencyCode,
		[Date] = @Date,
		[IsIncome] = @IsIncome,
		[IdWallet] = @IdWallet,
		[IdUser] = @IdUser
	WHERE [Id] = @Id AND [IdUser] = @IdUser
END