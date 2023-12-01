using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.X86;
using WebApi.Models.Dto.User;
using WebApi.Services.User;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userDto)
        {
            try
            {
                await _userService.Register(userDto);
                return Ok();
            }
            catch (Exception e)
            {
                // we need to create a json in order to make angular able to read it (it reads json)
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userDto)
        {
            try
            {
                UserLoginResponseDto responseDto = await _userService.Login(userDto);

                Response.Cookies.Append("X-Refresh-Token", responseDto.RefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Lax,
                    Expires = DateTime.UtcNow.AddDays(7)
                });

                return Ok(responseDto);
            }
            catch (Exception e)
            {
                // we need to create a json in order to make angular able to read it (it reads json)
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            try
            {
                string? refreshToken = Request.Cookies["X-Refresh-Token"];
                UserLoginResponseDto responseDto = await _userService.RefreshToken(refreshToken);

                Response.Cookies.Append("X-Refresh-Token", responseDto.RefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Lax,
                    Expires = DateTime.UtcNow.AddDays(7)
                });

                return Ok(responseDto);
            }
            catch (Exception e)
            {
                // we need to create a json in order to make angular able to read it (it reads json)
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("IsUsernameAvailable")]
        public async Task<IActionResult> IsUsernameAvailable(string username)
        {
            try
            {
                bool isAvailable = await _userService.IsUsernameAvailable(username);
                return Ok(isAvailable);
            }
            catch (Exception e)
            {
                // we need to create a json in order to make angular able to read it (it reads json)
                return BadRequest(new { message = e.Message });
            }
        }

        [HttpGet("IsEmailAvailable")]
        public async Task<IActionResult> IsEmailAvailable(string email)
        {
            try
            {
                bool isAvailable = await _userService.IsEmailAvailable(email);
                return Ok(isAvailable);
            }
            catch (Exception e)
            {
                // we need to create a json in order to make angular able to read it (it reads json)
                return BadRequest(new { message = e.Message });
            }
        }
    }
}
