CREATE PROCEDURE [dbo].[spGetCategoriesByTransaction]
	@IdTransaction INT,
	@IdUser INT
AS
BEGIN
	SELECT [Id], [Name], [IdSuperCategory], [IdUser]
	FROM [Category]
	WHERE [IdUser] = @IdUser AND Id IN (
		SELECT [IdCategory]
		FROM [CategoryTransaction]
		WHERE [IdTransaction] = @IdTransaction
	)
END
