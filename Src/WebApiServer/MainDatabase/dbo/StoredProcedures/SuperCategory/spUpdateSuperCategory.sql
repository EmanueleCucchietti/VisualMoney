CREATE PROCEDURE [dbo].[spUpdateSuperCategory]
	@Id INT,
	@Name NVARCHAR(50),
	@IdUser INT
AS
BEGIN
	UPDATE [dbo].[SuperCategory]
	SET [Name] = @Name
	WHERE [Id] = @Id AND [IdUser] = @IdUser
END