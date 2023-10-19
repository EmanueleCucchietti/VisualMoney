using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models.Entities
{
    public class SuperCategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int IdUser { get; set; }
        public UserModel? User { get; set; }

        
        // Relationships
        public ICollection<CategoryModel>? Categories { get; set; }
    }
}
