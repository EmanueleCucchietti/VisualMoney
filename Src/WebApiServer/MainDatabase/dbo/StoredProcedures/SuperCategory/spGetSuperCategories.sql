CREATE PROCEDURE [dbo].[spGetSuperCategories]
	@IdUser INT
AS
BEGIN
	SELECT [Id], [Name], [IdUser]
	FROM [dbo].[SuperCategory]
	WHERE [IdUser] = @IdUser
END