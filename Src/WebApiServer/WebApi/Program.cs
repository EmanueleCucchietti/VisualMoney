using DataAccessLayer.Data;
using DataAccessLayer.DbAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApi.Configuration;
using WebApi.Helpers;
using WebApi.Services;
using WebApi.Startup;

var builder = WebApplication.CreateBuilder(args);

var _configuration = builder.Configuration;

builder.Services.RegisterServices(_configuration);

var app = builder.Build();

app.ConfigureSwagger();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
