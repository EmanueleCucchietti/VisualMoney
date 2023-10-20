CREATE PROCEDURE [dbo].[spCreateUser]
	@Username NVARCHAR(50),
	@Email NVARCHAR(50),
	@Name NVARCHAR(50),
	@Surname NVARCHAR(50),
	@PasswordHash NVARCHAR(255),
	@PasswordSalt NVARCHAR(255),
	@Role NVARCHAR(25)
	
AS
BEGIN
	INSERT INTO [dbo].[User] (Username, Email, [Name], Surname, PasswordHash, PasswordSalt, [Role])
	VALUES (@Username, @Email, @Name, @Surname, @PasswordHash, @PasswordSalt, @Role)
END