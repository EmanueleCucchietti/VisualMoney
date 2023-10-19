CREATE TABLE [dbo].[SuperCategory]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [IdUser] INT NOT NULL,
	CONSTRAINT [FK_SuperCategory_User] FOREIGN KEY ([IdUser]) REFERENCES [dbo].[User] ([Id])
)
