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
	BEGIN TRANSACTION;

	BEGIN TRY
		IF(EXISTS(SELECT * FROM [Wallet] WHERE [Id] = @IdWallet AND [IdUser] = @IdUser))
		BEGIN
			INSERT INTO [Transaction] ([Name], [Amount], [CurrencyCode], [Date], [IsIncome], [IdWallet], [IdUser])
			VALUES (@Name, @Amount, @CurrencyCode, @Date, @IsIncome, @IdWallet, @IdUser);
		
			IF(@IsIncome = 1)
			BEGIN
				UPDATE [Wallet] 
				SET [Amount] = [Amount] + @Amount 
				WHERE [Id] = @IdWallet AND [IdUser] = @IdUser;
			END
			ELSE
			BEGIN
				UPDATE [Wallet] 
				SET [Amount] = [Amount] - @Amount 
				WHERE [Id] = @IdWallet AND [IdUser] = @IdUser;
			END
		END

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
	
END