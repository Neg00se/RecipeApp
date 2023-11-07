using RecipeAppData.Models;
using Shared.DtoModels;

namespace ServicesLayer
{
	public interface IRecipeService
	{
		Task CreateRecipe(CreateUpdateRecipeModel newRecipe, UserModel user);
		Task DeleteRecipe(int id);
		Task<List<DisplayRecipeListModel>> GetAllRecipes();
		Task UpdateRecipe(CreateUpdateRecipeModel newRecipe , UserModel author);
	}
}