CREATE PROCEDURE [dbo].[spGetSuperCategory]
	@Id INT,
	@IdUser INT
AS
BEGIN
	SELECT [Id], [Name], [IdUser]
	FROM [dbo].[SuperCategory]
	WHERE [Id] = @Id AND [IdUser] = @IdUser
END