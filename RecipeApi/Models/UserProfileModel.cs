using RecipeAppData.Models;

namespace RecipeApi.Models;

public class UserProfileModel
{
    public string Id { get; set; }
	public string UserName { get; set; }

    public string Email { get; set; }

    public int AuthoredRecipesCount { get; set; }

    public List<RecipeModel> Recipes { get; set; }

    public List<RatingModel> UserRates { get; set; }

}
