using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppClassLibrary.Models;

public class RecipeModel
{
	public int Id { get; set; }

	[Required]
	[MaxLength(50)]
	public string Title { get; set; }

	[Range(0, 5)]
	public int? Rating { get; set; } = null;

	public CuisineModel Cuisine { get; set; }

	public MealModel Meal { get; set; }

	[Required]
	public string Description { get; set; }

	[Required]
	public TimeSpan CookingTime { get; set; }

	[Required]
	public DifficultyModel Difficulty { get; set; }

	public UserModel Author { get; set; }

	public DateTime CreationDateTime { get; set; } = DateTime.UtcNow;

}
