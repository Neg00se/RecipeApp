using RecipeAppClassLibrary.Models;
using System.ComponentModel.DataAnnotations;

namespace RecipeApi.Models
{
	public class CreationRecipeModel
	{
        public int Id { get; set; }

		[Required]
		[MaxLength(50)]
		public string Title { get; set; }
		[Required]

		public string Description { get; set; }
		[Required]

		public TimeSpan CookingTime { get; set; }
		[Required]

		public DifficultyModel Difficulty { get; set; }

		public MealModel Meal { get; set; }

		public CuisineModel Cuisine { get; set; }

        public string AuthorObjectIdentifier { get; set; }
    }
}
