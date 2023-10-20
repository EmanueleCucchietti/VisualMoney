using DataAccessLayer.Data;
using DataAccessLayer.DbAccess;
using WebApi.Configuration;
using WebApi.Helpers;
using WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuration
var _configuration = builder.Configuration;
builder.Services.Configure<JwtConfiguration>(_configuration.GetSection("JwtConfiguration"));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddSingleton<ISqlDataAccess, SqlDataAccess>();
builder.Services.AddSingleton<IUserData, UserData>();

// Controller Services
builder.Services.AddScoped<IUserService, UserService>();

// Helpers
builder.Services.AddScoped<IAuthenticationHelper, AuthenticationHelper>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
