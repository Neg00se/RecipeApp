using RecipeAppData.Models;

namespace ServicesLayer
{
	public interface IRatingService
	{
		Task DeleteRate(int recipeId, UserModel user);
		Task RateRecipe(int recipeId, int value, UserModel user);
	}
}