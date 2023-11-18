using WebApi.Middlewares;
using WebApi.Startup;

var builder = WebApplication.CreateBuilder(args);

var _configuration = builder.Configuration;

builder.Services.RegisterServices(_configuration);

var app = builder.Build();

app.ConfigureSwagger();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();
