CREATE TABLE [dbo].[CounterpartyTransaction]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [IdCounterParty] INT NOT NULL, 
    [IdTransaction] INT NOT NULL
)
