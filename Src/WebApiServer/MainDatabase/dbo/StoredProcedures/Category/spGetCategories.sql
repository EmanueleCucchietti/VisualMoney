CREATE PROCEDURE [dbo].[spGetCategories]
    @IdUser INT
AS
BEGIN
    SELECT [Id], [Name], [IdSuperCategory], [IdUser]
    FROM [dbo].[Category]
    WHERE [IdUser] = @IdUser
END