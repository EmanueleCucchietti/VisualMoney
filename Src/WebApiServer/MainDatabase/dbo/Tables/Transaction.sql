CREATE TABLE [dbo].[Transaction]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Amount] MONEY NOT NULL, 
    [CurrencyCode] NCHAR(3) NOT NULL DEFAULT 'EUR', 
    [IsIncome] BIT NOT NULL, 
    [IdWallet] INT NOT NULL, 
    [IdUser] INT NOT NULL,
    CONSTRAINT [FK_TransactionWallet_Wallet] FOREIGN KEY ([IdWallet]) REFERENCES [dbo].[Wallet] ([Id]),
	CONSTRAINT [FK_TransactionUser_User] FOREIGN KEY ([IdUser]) REFERENCES [dbo].[User] ([Id])
)
