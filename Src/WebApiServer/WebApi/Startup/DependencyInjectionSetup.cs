using DataAccessLayer.Data;
using DataAccessLayer.DbAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApi.Configuration;
using WebApi.Helpers;
using WebApi.Services;

namespace WebApi.Startup
{
    public static class DependencyInjectionSetup
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services, ConfigurationManager _configuration)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddSwaggerGen();

            // Configuration
            var jwtConfigurationSection = _configuration.GetSection("JwtConfiguration");
            var jwtConfiguration = jwtConfigurationSection.Get<JwtConfiguration>()!;
            services.Configure<JwtConfiguration>(_configuration.GetSection("JwtConfiguration"));

            // DataAccess
            services.AddSingleton<ISqlDataAccess, SqlDataAccess>();
            services.AddSingleton<IUserData, UserData>();

            // Controller Services
            services.AddScoped<IUserService, UserService>();

            // Helpers
            services.AddScoped<IAuthenticationHelper, AuthenticationHelper>();

            // Authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = jwtConfiguration.Issuer,
                        ValidAudience = jwtConfiguration.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                            jwtConfiguration.Key))
                    };
                });

            return services;
        }
    }
}
