using RecipeAppData.Models;

namespace ServicesLayer
{
	public interface IInfoService
	{
		Task<List<DifficultyModel>> GetDifficultiesAsync();
		Task<DifficultyModel> GetDifficultyAsync(int id);
		Task<MealModel> GetMealAsync(int id);
		Task<List<MealModel>> GetMealsAsync();
	}
}