CREATE PROCEDURE [dbo].[spModifyCategoriesToTransaction]
    @IdTransaction INT,
    @IdUser INT,
    @CategoryIds [dbo].[CategoryIdTableType] readonly
AS
BEGIN
    BEGIN TRY
        -- Start the transaction
        BEGIN TRANSACTION;

        -- Check if the transaction exists for the given user
        IF EXISTS (SELECT 1 FROM [dbo].[Transaction] WHERE [Id] = @IdTransaction AND [IdUser] = @IdUser)
        BEGIN
            -- Remove existing categories
            DELETE FROM [dbo].[CategoryTransaction]
            WHERE IdTransaction = @IdTransaction

            -- Insert the categories into the CategoryTransaction table where the category belongs to the user
            INSERT INTO [dbo].[CategoryTransaction] ([IdCategory], [IdTransaction])
            SELECT c.IdCategory, @IdTransaction
            FROM @CategoryIds c
            WHERE EXISTS (
                SELECT 1 FROM [dbo].[Category] WHERE [Id] = c.IdCategory AND [IdUser] = @IdUser
            );
        END
		ELSE
		BEGIN
			RETURN -1;
		END

        -- Commit the transaction if everything succeeded
        COMMIT TRANSACTION;

		RETURN 1;
    END TRY
    BEGIN CATCH
        -- Rollback the transaction if any error occurs
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END

		RETURN -1;
    END CATCH
END
