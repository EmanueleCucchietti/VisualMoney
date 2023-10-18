CREATE TABLE [dbo].[BudgetCategory]
(
	[IdBudget] INT NOT NULL , 
    [IdCategory] INT NOT NULL, 
    PRIMARY KEY ([IdBudget], [IdCategory]), 
    CONSTRAINT [FK_BudgetCategory_Budget] FOREIGN KEY ([IdBudget]) REFERENCES [dbo].[Budget] ([Id]),
	CONSTRAINT [FK_BudgetCategory_Category] FOREIGN KEY ([IdCategory]) REFERENCES [dbo].[Category] ([Id])
);

