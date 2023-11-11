CREATE PROCEDURE [dbo].[spIsUsernameAvailable]
	@Username nvarchar(255)
AS
BEGIN
	-- return true if username is available
	IF NOT EXISTS (SELECT * FROM [dbo].[User] WHERE [Username] = @Username)
		SELECT 1
	ELSE
		SELECT 0
END