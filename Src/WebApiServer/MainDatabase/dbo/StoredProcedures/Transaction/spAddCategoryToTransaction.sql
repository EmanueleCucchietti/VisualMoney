CREATE PROCEDURE [dbo].[spAddCategoryToTransaction]
	@IdTransaction INT,
	@IdCategory INT,
	@IdUser INT
AS
BEGIN
	-- Add the category to the transaction
	IF EXISTS (SELECT * FROM [dbo].[Transaction] WHERE [Id] = @IdTransaction AND [IdUser] = @IdUser)
	BEGIN
		IF EXISTS (SELECT * FROM [dbo].[Category] WHERE [Id] = @IdCategory AND [IdUser] = @IdUser)
		BEGIN
			INSERT INTO [dbo].[CategoryTransaction] ([IdCategory], [IdTransaction])
			VALUES (@IdCategory, @IdTransaction)
		END
	END
END
	