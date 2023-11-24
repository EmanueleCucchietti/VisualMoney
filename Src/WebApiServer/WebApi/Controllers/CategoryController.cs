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

        [HttpGet("BySuperCategory/{idSuperCategory}")]
        public async Task<IActionResult> GetCategoryBySuperCategory(int idSuperCategory)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            var category = await _categoryService.GetCategoriesBySuperCategory(idSuperCategory, userId);

            if (category is null)
                return NotFound();

            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CategoryDto categoryDto)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            if (!await _categoryService.CreateCategory(userId, categoryDto))
                return StatusCode(500, new GenericErrorDto<CategoryDto>(categoryDto));

            return Ok(categoryDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CategoryDto categoryDto)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            if (!await _categoryService.UpdateCategory(id, categoryDto, userId))
                return StatusCode(500, new GenericErrorDto<CategoryDto>(categoryDto));

            return Ok(categoryDto);
        }



    }
}
