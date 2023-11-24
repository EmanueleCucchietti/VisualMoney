CREATE PROCEDURE [dbo].[spGetCategoriesBySuperCategory]
    @IdSuperCategory INT,
    @IdUser INT
AS
BEGIN
    SELECT [Id], [Name], [IdSuperCategory], [IdUser]
    FROM [dbo].[Category]
    WHERE [IdSuperCategory] = @IdSuperCategory AND [IdUser] = @IdUser
END