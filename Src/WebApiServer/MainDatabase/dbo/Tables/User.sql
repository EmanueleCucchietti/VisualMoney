CREATE TABLE [dbo].[User]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Username] NVARCHAR(50) NOT NULL, 
    [Email] NVARCHAR(50) NOT NULL, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Surname] NVARCHAR(50) NOT NULL, 
    [PasswordHash] VARBINARY(64) NOT NULL, 
    [Role] NVARCHAR(25) NOT NULL DEFAULT 'Default',
	[IsDeleted] BIT NOT NULL DEFAULT 0,
	CONSTRAINT [UQ_User_Username] UNIQUE ([Username]),
	CONSTRAINT [UQ_User_Email] UNIQUE ([Email]),
	CONSTRAINT [CK_User_PasswordHash] CHECK (LEN([PasswordHash]) = 64)
)
