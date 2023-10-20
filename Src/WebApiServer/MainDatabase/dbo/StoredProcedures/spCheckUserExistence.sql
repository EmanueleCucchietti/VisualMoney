CREATE PROCEDURE [dbo].[spCheckUserExistence]
	@Email NVARCHAR(50),
	@Username NVARCHAR(50)
AS

BEGIN
	SET NOCOUNT ON;

	IF EXISTS (SELECT * FROM [dbo].[User] WHERE Email = @Email OR Username = @Username)
		RETURN 1
	ELSE
		RETURN 0
END