using RecipeAppClassLibrary.Models;

namespace RecipeApi.Models;

public class UserProfileModel
{
	public string UserName { get; set; }

    public string Email { get; set; }


    public int AuthoredRecipesCount { get; set; }


    public List<RecipeModel> Recipes { get; set; }



}
