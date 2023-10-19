CREATE TABLE [dbo].[CounterpartyTransaction]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [IdCounterParty] INT NOT NULL, 
    [IdTransaction] INT NOT NULL,
	CONSTRAINT [FK_CounterpartyTransaction_CounterParty] FOREIGN KEY ([IdCounterParty]) REFERENCES [dbo].[CounterParty] ([Id]),
	CONSTRAINT [FK_CounterpartyTransaction_Transaction] FOREIGN KEY ([IdTransaction]) REFERENCES [dbo].[Transaction] ([Id])
)
