﻿CREATE PROCEDURE [dbo].[spGetTransactionsByWallet]
	@IdUser INT,
	@IdWallet INT
AS
BEGIN
	SELECT [Id], 
        [Name],
        [Amount],
        [CurrencyCode],
		[Date],
        [IsIncome],
        [IdWallet],
        [IdUser]
	FROM [Transaction]
	WHERE [IdUser] = @IdUser AND [IdWallet] = @IdWallet
END