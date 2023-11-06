using RecipeAppData.DataAccess;
using RecipeAppData.DataAccess.Info;
using RecipeAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer;

public class InfoService : IInfoService
{
	private readonly IInfoRepository _infoRep;


	public InfoService(IInfoRepository infoRep)
	{
		_infoRep = infoRep;

	}

	public async Task<List<MealModel>> GetMealsAsync()
	{

		var meals = await _infoRep.GetAllMeals();
		return meals;
	}

	public async Task<List<DifficultyModel>> GetDifficultiesAsync()
	{

		var difficulties = await _infoRep.GetAllDifficulties();
		return difficulties;
	}

	public async Task<MealModel> GetMealAsync(int id)
	{
		var meal = await _infoRep.GetMealById(id);
		return meal;
	}

	public async Task<DifficultyModel> GetDifficultyAsync(int id)
	{
		var difficulty = await _infoRep.GetDifficultyById(id);
		return difficulty;
	}

}
