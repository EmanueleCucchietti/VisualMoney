CREATE PROCEDURE [dbo].spGetUserByEmailOrUsername
	@EmailOrUsername nvarchar(50)
AS

BEGIN
	SELECT * FROM [User] 
	WHERE (Email = @EmailOrUsername OR Username = @EmailOrUsername)
END
