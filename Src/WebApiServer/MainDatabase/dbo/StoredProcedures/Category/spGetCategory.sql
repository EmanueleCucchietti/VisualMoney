CREATE PROCEDURE [dbo].[spGetCategory]
    @Id INT,
    @IdUser INT
AS
BEGIN
    SELECT [Id], [Name], [IdSuperCategory], [IdUser]
    FROM [dbo].[Category]
    WHERE [Id] = @Id AND [IdUser] = @IdUser
END