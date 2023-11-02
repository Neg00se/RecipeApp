using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;
using RecipeAppData.Models;
using RecipeAppData.Data;
using Shared.DtoModels;

namespace RecipeApi.Controllers;

[Route("api/[controller]")]
[ApiController]


public class RecipesController : ControllerBase
{
	private readonly RecipeAppDbContext _context;

	public RecipesController(RecipeAppDbContext context)
	{
		_context = context;
	}

	//TODO: move data operations to new data layer

	[HttpGet]
	[Route("GetAllRecipes")]
	public async Task<List<DisplayRecipeListModel>> GetAllRecipes()
	{
		var allRecipes = await _context.Recipes.Include(c => c.Cuisine)
												.Include(d => d.Difficulty)
												.Include(m => m.Meal)
												.Include(u => u.Author)
												.Include(r=>r.Rating).ToListAsync();

		List<DisplayRecipeListModel> list = new List<DisplayRecipeListModel>();
		


        foreach (var item in allRecipes)
        {
			DisplayRecipeListModel recipe = new DisplayRecipeListModel();
			recipe.Id = item.Id;
			recipe.Title = item.Title;
			recipe.Meal = item.Meal;
			recipe.Author = item.Author;
			recipe.Difficulty = item.Difficulty;
			recipe.CreationDateTime = item.CreationDateTime;
			recipe.Description = item.Description;
			recipe.CookingTime = item.CookingTime;
			recipe.Cuisine = item.Cuisine;
			recipe.RatingCount = item.Rating.Count;
			if (item.Rating.Count > 0)
			{
				recipe.MeanRating = item.Rating.Select(rating => rating.Value).Average();
			}
			else { recipe.MeanRating = 0; }
			list.Add(recipe);
        }

		return list;
    }

	[HttpPost]
	[Authorize]
	[Route("CreateRecipe")]
	public async Task<IActionResult> CreateRecipe(CreateUpdateRecipeModel newRecipe)
	{
		try
		{
			var author = GetAuthor();

			if (author is null)
			{
				throw new Exception("User is not registered");
			}

			RecipeModel recipe = new()
			{
				Id = newRecipe.Id,
				Title = newRecipe.Title,
				Cuisine = newRecipe.Cuisine,
				Meal = GetMeal(newRecipe.MealId),
				CookingTime = newRecipe.CookingTime,
				Description = newRecipe.Description,
				Difficulty = GetDifficulty(newRecipe.DifficultyId),
				CreationDateTime = DateTime.UtcNow,
				Author = author
			};


			_context.Recipes.Add(recipe);
			await _context.SaveChangesAsync();
			return Ok();
		}
		catch (Exception ex)
		{

			return BadRequest(ex.Message);

		}
	}


	[HttpPut]
	[Authorize]
	[Route("UpdateRecipe")]
	public async Task<IActionResult> UpdateRecipe(CreateUpdateRecipeModel updateRecipe)
	{
		try
		{
			var author = GetAuthor();

			if (author is null)
			{
				throw new Exception("Cant find User");
			}

			var recipe = _context.Recipes.FirstOrDefault(r=> r.Id == updateRecipe.Id);
			if (recipe is not null)
			{
				recipe.Id = updateRecipe.Id;
				recipe.Title = updateRecipe.Title;
				recipe.Description = updateRecipe.Description;
				recipe.CookingTime = updateRecipe.CookingTime;
				recipe.Cuisine = updateRecipe.Cuisine;
				recipe.Meal = GetMeal(updateRecipe.MealId);
				recipe.Difficulty = GetDifficulty(updateRecipe.DifficultyId);
				recipe.Author = author;

				_context.Recipes.Update(recipe);
				await _context.SaveChangesAsync();
				return Ok();
			}
			else
			{
				return BadRequest();
			}

			
		}
		catch (Exception ex)
		{
			return BadRequest(ex.Message);

		}
	}

	[HttpDelete]
	[Route("delete/{id}")]
	[Authorize]

	public async Task<IActionResult> DeleteRecipe(int id)
	{
		var recipe = await _context.Recipes.FindAsync(id);

		if (recipe is not null)
		{
			_context.Recipes.Remove(recipe);
			await _context.SaveChangesAsync();
			return Ok();
		}
		return BadRequest();
	}

	//TODO: move everything below to helper class

	private UserModel GetAuthor()
	{
		var authorObjId = User.Claims.FirstOrDefault(c => c.Type.Contains("objectidentifier"))?.Value;
		var author = _context.Users.FirstOrDefault(u => u.ObjectIdentifier == authorObjId);
		return author;
	}

	private DifficultyModel GetDifficulty(int difficultyId)
	{
		DifficultyModel difficulty = _context.Difficulty.Find(difficultyId);
		return difficulty;
	}

	private MealModel GetMeal(int mealId)
	{
		MealModel meal = _context.Meals.Find(mealId);
		return meal;

	}
}
