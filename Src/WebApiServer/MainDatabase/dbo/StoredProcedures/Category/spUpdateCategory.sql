CREATE PROCEDURE [dbo].[spUpdateCategory]
    @Id INT,
    @Name NVARCHAR(50),
    @IdSuperCategory INT NULL,
    @IdUser INT
AS
BEGIN
    UPDATE [dbo].[Category]
    SET [Name] = @Name, [IdSuperCategory] = @IdSuperCategory, [IdUser] = @IdUser
    WHERE [Id] = @Id
END