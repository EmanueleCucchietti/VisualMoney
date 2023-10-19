using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models.Entities
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? IdSuperCategory { get; set; }
        public SuperCategoryModel? SuperCategory { get; set; }
        public int IdUser { get; set; }
        public UserModel? User { get; set; }
    }
}
