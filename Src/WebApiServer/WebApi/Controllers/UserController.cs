using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.X86;
using WebApi.Models.Dto.User;
using WebApi.Services;

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


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userDto)
        {
            try
            {
                await _userService.Register(userDto);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userDto)
        {
            try
            {
                UserLoginResponseDto responseDto = await _userService.Login(userDto);

                Response.Cookies.Append("X-Refresh-Token", responseDto.RefreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(7)
                });

                return Ok(responseDto);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }
}
