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
	BEGIN TRANSACTION;

	BEGIN TRY
		IF(
			EXISTS(SELECT * FROM [Wallet] WHERE [Id] = @IdWallet AND [IdUser] = @IdUser) AND 
			EXISTS(SELECT * FROM [Transaction] WHERE [Id] = @Id AND [IdUser] = @IdUser)
		)
		BEGIN
			DECLARE @OldAmount MONEY;
			DECLARE @OldIsIncome BIT;
			DECLARE @OldIdWallet INT;

			-- Get the old amount and IsIncome before the update
			SELECT @OldAmount = [Amount], @OldIsIncome = [IsIncome], @OldIdWallet = [IdWallet] FROM [Transaction] WHERE [Id] = @Id AND [IdUser] = @IdUser;

			-- if the transaction is income subtract, else add
			IF(@OldIsIncome = 1)
			BEGIN
				UPDATE [Wallet] 
				SET [Amount] = [Amount] - @OldAmount
				WHERE [Id] = @OldIdWallet AND [IdUser] = @IdUser;
			END
			ELSE
			BEGIN
				UPDATE [Wallet] 
				SET [Amount] = [Amount] + @OldAmount
				WHERE [Id] = @OldIdWallet AND [IdUser] = @IdUser;
			END

			UPDATE [dbo].[Transaction]
			SET [Name] = @Name,
				[Amount] = @Amount,	 
				[CurrencyCode] = @CurrencyCode,
				[Date] = @Date,
				[IsIncome] = @IsIncome,
				[IdWallet] = @IdWallet,
				[IdUser] = @IdUser
			WHERE [Id] = @Id AND [IdUser] = @IdUser;

			-- if the transaction is income add, else subtract
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