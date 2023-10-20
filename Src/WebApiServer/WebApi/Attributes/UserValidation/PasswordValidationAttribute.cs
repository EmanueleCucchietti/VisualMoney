namespace WebApi.Attributes.UserValidation
{
    using System;
    using System.ComponentModel.DataAnnotations;

    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
    public class PasswordValidationAttribute : ValidationAttribute
    {
        public int MinimumLength { get; set; } // Define your minimum length requirement
        public bool RequireUppercase { get; set; } // Define whether an uppercase letter is required
        public bool RequireLowercase { get; set; } // Define whether a lowercase letter is required
        public bool RequireDigit { get; set; } // Define whether a digit is required
        public bool RequireSpecialCharacter { get; set; } // Define whether a special character is required

        //public PasswordValidationAttribute()
        //{
        //    // Set default values for your requirements
        //    MinimumLength = 8;
        //    RequireUppercase = true;
        //    RequireLowercase = true;
        //    RequireDigit = true;
        //    RequireSpecialCharacter = true;
        //}

        public PasswordValidationAttribute()
        {
            // Set default values for your requirements
            MinimumLength = 1;
            RequireUppercase = false;
            RequireLowercase = false;
            RequireDigit = false;
            RequireSpecialCharacter = false;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var password = value as string;

            if (string.IsNullOrWhiteSpace(password))
            {
                return new ValidationResult("Password is required.");
            }

            if (password.Length < MinimumLength)
            {
                return new ValidationResult($"Password must be at least {MinimumLength} characters long.");
            }

            if (RequireUppercase && !password.Any(char.IsUpper))
            {
                return new ValidationResult("Password must contain at least one uppercase letter.");
            }

            if (RequireLowercase && !password.Any(char.IsLower))
            {
                return new ValidationResult("Password must contain at least one lowercase letter.");
            }

            if (RequireDigit && !password.Any(char.IsDigit))
            {
                return new ValidationResult("Password must contain at least one digit.");
            }

            if (RequireSpecialCharacter && !password.Any(IsSpecialCharacter))
            {
                return new ValidationResult("Password must contain at least one special character.");
            }

            return ValidationResult.Success;
        }

        private bool IsSpecialCharacter(char c)
        {
            // Define your criteria for special characters here
            string specialCharacters = "!?@#$%^&*()_+";
            return specialCharacters.Contains(c);
        }
    }

}
