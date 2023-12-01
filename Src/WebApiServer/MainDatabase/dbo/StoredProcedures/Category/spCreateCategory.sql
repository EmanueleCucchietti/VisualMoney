CREATE PROCEDURE [dbo].[spCreateCategory]
    @Name NVARCHAR(50),
    @IdSuperCategory INT NULL,
    @IdUser INT
AS
BEGIN
    INSERT INTO [dbo].[Category] ([Name], [IdSuperCategory], [IdUser])
    VALUES (@Name, @IdSuperCategory, @IdUser)
END