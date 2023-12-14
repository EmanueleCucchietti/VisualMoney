CREATE TABLE [dbo].[CategoryTransaction]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [IdCategory] INT NOT NULL, 
    [IdTransaction] INT NOT NULL,
    CONSTRAINT [FK_CategoryTransaction_Category] FOREIGN KEY ([IdCategory]) REFERENCES [dbo].[Category] ([Id]) ON DELETE CASCADE,
	CONSTRAINT [FK_CategoryTransaction_Transaction] FOREIGN KEY ([IdTransaction]) REFERENCES [dbo].[Transaction] ([Id]) ON DELETE CASCADE
)
