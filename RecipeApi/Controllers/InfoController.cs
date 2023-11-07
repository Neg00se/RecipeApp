using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeAppData.Models;
using RecipeAppData.Data;
using ServicesLayer;

namespace RecipeApi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class InfoController : ControllerBase
	{
		private readonly IInfoService _infoService;

		public InfoController(IInfoService infoService)
		{
			_infoService = infoService;
		}



		[HttpGet]
		[Route("Meals")]

		public async Task<List<MealModel>> GetMeals()
		{
			var meals =await _infoService.GetMealsAsync();
			return meals;
			
		}

		[HttpGet]
		[Route("Difficulties")]

		public async Task<List<DifficultyModel>> GetDifficulties()
		{
			var difficulties = await _infoService.GetDifficultiesAsync();
			return difficulties;
			
		}



	}
}
