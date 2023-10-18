CREATE TABLE [dbo].[CategoryTransaction]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [IdCategory] INT NOT NULL, 
    [IdTransaction] INT NOT NULL,
    CONSTRAINT [FK_CategoryTransaction_Category] FOREIGN KEY ([IdCategory]) REFERENCES [dbo].[Category] ([Id]),
	CONSTRAINT [FK_CategoryTransaction_Transaction] FOREIGN KEY ([IdTransaction]) REFERENCES [dbo].[Transaction] ([Id])
)
