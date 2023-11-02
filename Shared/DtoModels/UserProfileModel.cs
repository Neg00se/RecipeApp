using RecipeAppData.Models;

namespace Shared.DtoModels;

//TODO: Remove this model coz it not necessary anymore
public class UserProfileModel
{
	public string Id { get; set; }
	public string UserName { get; set; }

	public string Email { get; set; }

	public int AuthoredRecipesCount { get; set; }

	public List<RecipeModel> Recipes { get; set; }

	public List<RatingModel> UserRates { get; set; }

}
