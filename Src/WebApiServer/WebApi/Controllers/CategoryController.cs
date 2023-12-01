using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Dto;
using WebApi.Models.Dto.Category;
using WebApi.Services.Category;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            var categories = await _categoryService.GetCategories(userId);

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            var category = await _categoryService.GetCategory(id, userId);

            if (category is null)
                return NotFound();

            return Ok(category);
        }

        [HttpGet("SuperCategory/{idSuperCategory}")]
        public async Task<IActionResult> GetCategoryBySuperCategory(int idSuperCategory)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int idUser)
                return Unauthorized();

            var category = await _categoryService.GetCategoriesBySuperCategory(idSuperCategory, idUser);

            if (category is null)
                return NotFound();

            return Ok(category);
        }

        [HttpGet("Transaction/{idTransaction}")]
        public async Task<IActionResult> GetCategoriesByTransaction(int idTransaction)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int idUser)
                return Unauthorized();

            var categories = await _categoryService.GetCategoriesByTransaction(idTransaction, idUser);

            return Ok(categories);
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CategoryDto categoryDto)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int idUser)
                return Unauthorized();

            if (!await _categoryService.CreateCategory(idUser, categoryDto))
                return StatusCode(500, new GenericErrorDto<CategoryDto>(categoryDto));

            return Ok(categoryDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CategoryDto categoryDto)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int idUser)
                return Unauthorized();

            if (!await _categoryService.UpdateCategory(id, categoryDto, idUser))
                return StatusCode(500, new GenericErrorDto<CategoryDto>(categoryDto));

            return Ok(categoryDto);
        }



    }
}
