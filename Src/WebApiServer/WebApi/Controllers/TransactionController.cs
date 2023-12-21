using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Dto;
using WebApi.Models.Dto.Transaction;
using WebApi.Models.Dto.Wallet;
using WebApi.Services.Transaction;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class TransactionController : Controller
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(bool loadCategoriesAndCounterParties = false)
        {
            if (HttpContext.Items["UserId"] is not int idUser)
                return Unauthorized();

            var transactions = await _transactionService.GetTransactionsAsync(idUser, loadCategoriesAndCounterParties);

            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var userId = Convert.ToInt32(HttpContext.Items["UserId"]);

            var transaction = await _transactionService.GetTransactionAsync(id, userId);

            if (transaction is null)
                return NotFound();

            return Ok(transaction);
        }

        [HttpGet("Wallet/{walletId}")]
        public async Task<IActionResult> GetByWallet(int walletId)
        {
            if (HttpContext.Items["UserId"] is not int idUser)
                return Unauthorized();

            var transactions = await _transactionService.GetTransactionsByWallet(idUser, walletId);

            return Ok(transactions);
        }

        [HttpGet("Category/{idCategory}")]
        public async Task<IActionResult> GetByCategory(int idCategory)
        {
            if (HttpContext.Items["UserId"] is not int idUser)
                return Unauthorized();

            var transactions = await _transactionService.GetTransactionsByCategoryAsync(idCategory, idUser);

            return Ok(transactions);
        }

        [HttpGet("CounterParty/{counterPartyId}")]
        public async Task<IActionResult> GetByCounterParty(int counterPartyId)
        {
            if (HttpContext.Items["UserId"] is not int idUser)
                return Unauthorized();

            var transactions = await _transactionService.GetTransactionsByCounterPartyAsync(idUser, counterPartyId);

            return Ok(transactions);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TransactionDto transaction)
        {
            if (HttpContext.Items["UserId"] is not int idUser)
                return Unauthorized();

            await _transactionService.AddTransactionAsync(idUser, transaction);
            return Ok(transaction);
        }

        [HttpPost("{idTransaction}/Category/{idCategory}")]
        public async Task<IActionResult> AddCategory(int idTransaction, int idCategory)
        {
            if (HttpContext.Items["UserId"]
                is not int userId)
                return Unauthorized();

            if (!await _transactionService.AddCategoryToTransactionAsync(idTransaction, idCategory, userId))
                return StatusCode(500, new GenericErrorDto<object>());

            return Ok();
        }

        [HttpPost("{idTransaction}/CounterParty/{idCounterParty}")]
        public async Task<IActionResult> AddCounterParty(int idTransaction, int idCounterParty)
        {
            if (HttpContext.Items["UserId"]
                is not int idUser)
                return Unauthorized();

            if (!await _transactionService.AddCounterPartyToTransactionAsync(idTransaction, idCounterParty, idUser))
                return StatusCode(500, new GenericErrorDto<object>());

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TransactionDto transaction)
        {
            if (HttpContext.Items["UserId"] is not int idUser)
                return Unauthorized();

            await _transactionService.UpdateTransaction(id, transaction, idUser);
            return Ok(transaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (HttpContext.Items["UserId"] is not int idUser)
                return Unauthorized();

            await _transactionService.DeleteTransactionAsync(id, idUser);
            return Ok();
        }


    }
}
