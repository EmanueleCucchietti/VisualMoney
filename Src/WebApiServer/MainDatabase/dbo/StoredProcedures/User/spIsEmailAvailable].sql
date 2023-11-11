CREATE PROCEDURE [dbo].[spIsEmailAvailable]
	@Email nvarchar(255)
AS
BEGIN
	-- return true if username is available
	IF NOT EXISTS (SELECT * FROM [dbo].[User] WHERE [Email] = @Email)
		SELECT 1
	ELSE
		SELECT 0
END