CREATE PROCEDURE [dbo].[spDeleteTransaction]
	@Id INT,
	@IdUser INT
AS
BEGIN
	BEGIN TRANSACTION;

	BEGIN TRY
		IF(EXISTS(SELECT * FROM [Transaction] WHERE [Id] = @Id AND [IdUser] = @IdUser))
		BEGIN
			DECLARE @OldAmount MONEY;
			DECLARE @OldIsIncome BIT;
			DECLARE @IdWallet INT;

			-- Get the old amount and IsIncome before the update
			SELECT @OldAmount = [Amount], @OldIsIncome = [IsIncome], @IdWallet = [IdWallet] FROM [Transaction] WHERE [Id] = @Id AND [IdUser] = @IdUser;

			-- if the transaction is income subtract, else add
			IF(@OldIsIncome = 1)
			BEGIN
				UPDATE [Wallet] 
				SET [Amount] = [Amount] - @OldAmount
				WHERE [Id] = @IdWallet AND [IdUser] = @IdUser;
			END
			ELSE
			BEGIN
				UPDATE [Wallet] 
				SET [Amount] = [Amount] + @OldAmount
				WHERE [Id] = @IdWallet AND [IdUser] = @IdUser;
			END

			DELETE [dbo].[Transaction]
			WHERE [Id] = @Id AND [IdUser] = @IdUser;
		END

		COMMIT TRANSACTION;
	END TRY
	BEGIN CATCH
		ROLLBACK TRANSACTION;
		THROW;
	END CATCH
END