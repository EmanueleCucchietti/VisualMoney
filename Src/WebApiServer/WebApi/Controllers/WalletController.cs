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
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            var wallets = await _walletService.GetWallets(userId);

            return Ok(wallets);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var wallet = await _walletService.GetWallet(id);

            if (wallet is null)
                return NotFound();

            return Ok(wallet);
        }
        
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] WalletDto wallet)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            await _walletService.CreateWallet(userId, wallet);

            return Ok(wallet);
        }
        
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] WalletWithIdDto wallet)
        {
            await _walletService.UpdateWallet(wallet);

            return Ok(wallet);
        }
    }
}
