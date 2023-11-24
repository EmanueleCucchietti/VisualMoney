CREATE PROCEDURE [dbo].[spCreateSuperCategory]
	@Name NVARCHAR(50),
	@IdUser INT
AS
BEGIN
	INSERT INTO [dbo].[SuperCategory] ([Name], [IdUser])
	VALUES (@Name, @IdUser)
END