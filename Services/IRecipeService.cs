using Shared.DtoModels;

namespace ServicesLayer
{
	public interface IRecipeService
	{
		Task CreateRecipe(CreateUpdateRecipeModel newRecipe, string userObjId);
		Task DeleteRecipe(int id);
		Task<List<DisplayRecipeListModel>> GetAllRecipes();
		Task UpdateRecipe(CreateUpdateRecipeModel newRecipe);
	}
}