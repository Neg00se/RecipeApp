using RecipeAppClassLibrary.Models;
using System.ComponentModel.DataAnnotations;

namespace RecipeApi.Models
{
	public class DisplayRecipeListModel
	{

		public int Id { get; set; }

		[Required]
		[MaxLength(50)]
		public string Title { get; set; }

		public double MeanRating { get; set; }

		public int RatingCount { get ; set; }

		public CuisineModel? Cuisine { get; set; }

		public MealModel Meal { get; set; }

		[Required]
		public string Description { get; set; }

		[Required]
		public TimeSpan CookingTime { get; set; }

		[Required]
		public DifficultyModel Difficulty { get; set; }

		public UserModel Author { get; set; }

		public DateTime CreationDateTime { get; set; } 


	}
}
