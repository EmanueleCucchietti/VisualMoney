using DataAccessLayer.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Principal;
using WebApi.Models.Dto.Wallet;
using WebApi.Services.Wallet;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _walletService;

        public WalletController(IWalletService walletService)
        {
            _walletService = walletService;
        }

        // GET: api/<WalletController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            // Get user id from token
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity is null)
                return Unauthorized();

            if (!int.TryParse(identity.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId))
                return BadRequest("Invalid user ID format");

            var wallets = await _walletService.GetWallets(userId);

            return Ok(wallets);
        }

        // GET api/<WalletController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity is null)
                return Unauthorized();

            var wallet = await _walletService.GetWallet(id);

            if (wallet is null)
                return NotFound();

            return Ok(wallet);
        }

        // POST api/<WalletController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] WalletDto wallet)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity is null)
                return Unauthorized();

            if (!int.TryParse(identity.FindFirst(ClaimTypes.NameIdentifier)?.Value, out var userId))
                return BadRequest("Invalid user ID format");

            await _walletService.CreateWallet(userId, wallet);

            return Ok(wallet);
        }

        // PUT api/<WalletController>
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] WalletWithIdDto wallet)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity is null)
                return Unauthorized();

            await _walletService.UpdateWallet(wallet);

            return Ok(wallet);
        }
    }
}
