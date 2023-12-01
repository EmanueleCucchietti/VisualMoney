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
    public class SuperCategoryController : Controller
    {
        private readonly ISuperCategoryService _superCategoryService;

        public SuperCategoryController(ISuperCategoryService superCategoryService)
        {
            _superCategoryService = superCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            var categories = await _superCategoryService.GetCategoriesAsync(userId);

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            var category = await _superCategoryService.GetCategoryAsync(id, userId);

            if (category is null)
                return NotFound();

            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SuperCategoryDto categoryDto)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            if (!await _superCategoryService.CreateCategoryAsync(userId, categoryDto))
                return StatusCode(500, new GenericErrorDto<SuperCategoryDto>(categoryDto));

            return Ok(categoryDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] SuperCategoryDto categoryDto)
        {
            if (!HttpContext.Items.ContainsKey("UserId")
                || HttpContext.Items["UserId"] is not int userId)
                return Unauthorized();

            if (!await _superCategoryService.UpdateCategoryAsync(id, categoryDto, userId))
                return StatusCode(500, new GenericErrorDto<SuperCategoryDto>(categoryDto));

            return Ok(categoryDto);
        }



    }
}
