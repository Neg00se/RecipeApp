using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;
using RecipeAppData.Models;
using RecipeAppData.Data;

namespace RecipeApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class InfoController : ControllerBase
	{
		private readonly RecipeAppDbContext _context;

		public InfoController(RecipeAppDbContext context)
		{
			_context = context;
		}



		[HttpGet]
		[Route("Meals")]

		public async Task<List<MealModel>> GetMeals()
		{
			
			return await _context.Meals.ToListAsync();
			
		}

		[HttpGet]
		[Route("Difficulties")]

		public async Task<List<DifficultyModel>> GetDifficulties()
		{
			return await _context.Difficulty.ToListAsync();
			
		}



	}
}
