using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Dto.User
{
    public class UserLoginDto
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string EmailOrUsername { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Password { get; set; }
    }
}