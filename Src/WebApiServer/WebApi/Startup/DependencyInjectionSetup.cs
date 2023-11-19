using DataAccessLayer.Data.CounterParty;
using DataAccessLayer.Data.User;
using DataAccessLayer.Data.Wallet;
using DataAccessLayer.DbAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System.Text;
using WebApi.Configuration;
using WebApi.Helpers;
using WebApi.Middlewares;
using WebApi.Services.CounterParty;
using WebApi.Services.User;
using WebApi.Services.Wallet;

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

            // Logging
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(_configuration)
                .CreateLogger();
            services.AddSingleton(Log.Logger);

            // DataAccess
            services.AddSingleton<ISqlDataAccess, SqlDataAccess>();
            services.AddSingleton<IUserData, UserData>();
            services.AddSingleton<IWalletData, WalletData>();
            services.AddSingleton<ICounterPartyData, CounterPartyData>();

            // Controller Services
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IWalletService, WalletService>();
            services.AddScoped<ICounterPartyService, CounterPartyService>();

            // Helpers
            services.AddScoped<IAuthenticationHelper, AuthenticationHelper>();

            // Authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
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

            // Cors
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                {
                    builder.WithOrigins(
                        "http://localhost:3000",
                        "http://localhost:8080",
                        "https://localhost:8443")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                });
            });

            // Error Handling
            services.AddTransient<ErrorHandlerMiddleware>();

            return services;
        }
    }
}
