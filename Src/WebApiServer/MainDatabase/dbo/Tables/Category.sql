CREATE TABLE [dbo].[Category]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] NVARCHAR(50) NOT NULL, 
    [IdSuperCategory] INT NULL, 
    [IdUser] INT NOT NULL,
    CONSTRAINT [FK_Category_User] FOREIGN KEY ([IdUser]) REFERENCES [dbo].[User]([Id]),
    CONSTRAINT [FK_Category_SuperCategory] FOREIGN KEY ([IdSuperCategory]) REFERENCES [dbo].[SuperCategory]([Id])
)

GO
EXEC sp_addextendedproperty @name = N'MS_Description',
    @value = N'If null, there is no super category',
    @level0type = N'SCHEMA',
    @level0name = N'dbo',
    @level1type = N'TABLE',
    @level1name = N'Category',
    @level2type = N'COLUMN',
    @level2name = N'IdSuperCategory'