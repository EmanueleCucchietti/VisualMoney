using System.ComponentModel.DataAnnotations;
using WebApi.Attributes.UserValidation;

namespace WebApi.Models.Dto.User
{
    public class UserRegisterDto
    {
        public string Username { get; set; }
        [EmailAddress]
        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        [PasswordValidation]
        public string Password { get; set; }
    }
}
