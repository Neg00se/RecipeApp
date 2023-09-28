using RecipeAppClassLibrary.Models;
using System.ComponentModel.DataAnnotations;

namespace RecipeApi.Models
{
	public class CreateUpdateRecipeModel
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
		public int DifficultyId { get; set; }
		[Required]
		public int MealId { get; set; }

		public CuisineModel? Cuisine { get; set; }

    }
}
