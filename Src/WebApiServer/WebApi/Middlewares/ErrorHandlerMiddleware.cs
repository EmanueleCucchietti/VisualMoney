using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace WebApi.Middlewares
{
    public class ErrorHandlerMiddleware : IMiddleware
    {
        private readonly ILogger<ErrorHandlerMiddleware> _logger;

        public ErrorHandlerMiddleware(
            ILogger<ErrorHandlerMiddleware> logger) =>
            _logger = logger;

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                ProblemDetails problem = new()
                {
                    Status = context.Response.StatusCode,
                    Type = "https://tools.ietf.org/html/rfc7231#section-6.6.1",
                    Title = "Internal Server Error",
                    Detail = $"Undefined Internal error. Logged at time: {DateTime.Now:yyyyMMdd HH:mm:ss}",
                };

                await context.Response.WriteAsJsonAsync(problem);
            }
        }
    }
}
