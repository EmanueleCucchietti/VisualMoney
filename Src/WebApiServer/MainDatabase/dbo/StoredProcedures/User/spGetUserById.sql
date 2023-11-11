CREATE PROCEDURE [dbo].[spGetUserById]
	@Id int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM [dbo].[User] WHERE Id = @Id
END
