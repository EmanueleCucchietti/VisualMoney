﻿CREATE TABLE [dbo].[Wallet]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Amount] MONEY NOT NULL, 
    [CurrencyCode] NCHAR(3) NOT NULL DEFAULT 'EUR', 
    [IdUser] INT NOT NULL,
	CONSTRAINT [FK_WalletUser_User] FOREIGN KEY ([IdUser]) REFERENCES [dbo].[User] ([Id])
)
