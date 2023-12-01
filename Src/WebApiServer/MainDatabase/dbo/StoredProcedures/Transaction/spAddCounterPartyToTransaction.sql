CREATE PROCEDURE [dbo].[spAddCounterPartyToTransaction]
	@IdTransaction INT,
	@IdCounterParty INT,
	@IdUser INT
AS
BEGIN
	-- Add the counter party to the transaction
	IF EXISTS (SELECT * FROM [dbo].[Transaction] WHERE [Id] = @IdTransaction AND [IdUser] = @IdUser)
	BEGIN
		IF EXISTS (SELECT * FROM [dbo].[CounterParty] WHERE [Id] = @IdCounterParty AND [IdUser] = @IdUser)
		BEGIN
			INSERT INTO [dbo].[CounterPartyTransaction] ([IdCounterParty], [IdTransaction])
			VALUES (@IdCounterParty, @IdTransaction)
		END
	END
END