using DataAccessLayer.Models.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Security.Principal;
using WebApi.Models.Dto;
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

            if (!await _walletService.CreateWallet(userId, wallet))
                return StatusCode(500, new GenericErrorDto<WalletDto>(wallet));

            return Ok(wallet);
        }
        
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] WalletWithIdDto wallet)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();
            
            if(!await _walletService.UpdateWallet(wallet, userId))
                return StatusCode(500, new GenericErrorDto<WalletWithIdDto>(wallet));

            return Ok(wallet);
        }
    }
}
