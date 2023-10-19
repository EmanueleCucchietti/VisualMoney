CREATE TABLE [dbo].[Budget]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Amount] MONEY NOT NULL, 
    [CurrencyCode] NCHAR(3) NOT NULL DEFAULT 'EUR', 
    [TimeIntervalType] NVARCHAR(10) NOT NULL, 
    [StartDate] DATE NULL, 
    [EndDate] DATE NULL, 
    [Repeat] BIT NOT NULL,
    [RepeatInterval] SMALLINT NULL, 
    [IdUser] INT NOT NULL,
	CONSTRAINT [FK_Budget_User] FOREIGN KEY ([IdUser]) REFERENCES [dbo].[User]([Id])
)

GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'how many {TimeIntervalType} to repeat, if {TimeIntervalType} is set to custom, then days',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Budget',
    @level2type = N'COLUMN',
    @level2name = N'RepeatInterval'