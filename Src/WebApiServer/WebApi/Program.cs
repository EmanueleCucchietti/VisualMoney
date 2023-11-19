using Serilog;
using WebApi.Middlewares;
using WebApi.Startup;

var builder = WebApplication.CreateBuilder(args);

var _configuration = builder.Configuration;

builder.Services.RegisterServices(_configuration);

builder.Host.UseSerilog(Log.Logger);

var app = builder.Build();

app.UseSerilogRequestLogging();

app.ConfigureSwagger();

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.UseMiddleware<JwtMiddleware>();

app.UseMiddleware<ErrorHandlerMiddleware>();

app.MapControllers();

app.Run();
