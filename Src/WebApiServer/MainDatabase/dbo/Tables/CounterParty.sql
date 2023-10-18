CREATE TABLE [dbo].[CounterParty]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [IsHidden] BIT NOT NULL, 
    [IdUser] INT NOT NULL,
    CONSTRAINT [FK_CounterParty_User] FOREIGN KEY ([IdUser]) REFERENCES [dbo].[User]([Id])
)
