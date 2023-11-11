CREATE PROCEDURE [dbo].[spCheckUserExistence]
	@Email NVARCHAR(50),
	@Username NVARCHAR(50)
AS

BEGIN
	SET NOCOUNT ON;

	SELECT * FROM [dbo].[User] WHERE Email = @Email OR Username = @Username

END