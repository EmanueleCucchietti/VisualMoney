using System.Security.Claims;

namespace WebApi.Middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var identity = context.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                if (int.TryParse(identity.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId))
                {
                    // Add the user ID to the HttpContext
                    context.Items["UserId"] = userId;
                }
            }

            await _next(context);
        }

    }
}
