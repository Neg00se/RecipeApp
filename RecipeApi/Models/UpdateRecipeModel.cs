using RecipeAppClassLibrary.Models;

namespace RecipeApi.Models
{
	public class UpdateRecipeModel
	{
		

		public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public TimeSpan CookingTime { get; set; }

        public DifficultyModel Difficulty { get; set; }

		public MealModel Meal { get; set; }

        public CuisineModel Cuisine { get; set; }

    }
}
