namespace DataAccessLayer.Models.Entities
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string Role { get; set; }
        public bool IsDeleted { get; set; }

        
        // Relationships
        public ICollection<BudgetModel>? Budgets { get; set; }
        public ICollection<CategoryModel>? Categories { get; set; }
        public ICollection<CounterPartyModel>? CounterParties { get; set; }
        public ICollection<SuperCategoryModel>? SuperCategories { get; set; }
        public ICollection<TransactionModel>? Transactions { get; set; }
        public ICollection<WalletModel>? Wallets { get; set; }
        
        
    }
}
