using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;
using RecipeAppClassLibrary.Data;
using RecipeAppClassLibrary.Models;

namespace RecipeApi.Controllers;

[Route("api/[controller]")]
[ApiController]


public  class RecipesController : ControllerBase
{
	private readonly RecipeAppDbContext _context;

	public RecipesController(RecipeAppDbContext context)
	{
		_context = context;
	}

	[HttpGet]
	[Route("GetAllRecipes")]
	public async Task<List<RecipeModel>> GetAllRecipes()
	{
		var allRecipes = await _context.Recipes.Include(c => c.Cuisine)
												.Include(d => d.Difficulty)
												.Include(m => m.Meal)
												.Include(u => u.Author).ToListAsync();

		return allRecipes;
	}

	[HttpPost]
	[Authorize]
	public async Task<IActionResult> CreateRecipe(CreationRecipeModel newRecipe)
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
				Meal = newRecipe.Meal,
				CookingTime = newRecipe.CookingTime,
				Description = newRecipe.Description,
				Difficulty = newRecipe.Difficulty,
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

	public async Task<IActionResult> UpdateRecipe(UpdateRecipeModel updateRecipe)
	{
		try
		{
			var author = GetAuthor();

			if(author is null)
			{
				throw new Exception("Cant find User");
			}


			RecipeModel changedRecipe= new()
			{
				Id = updateRecipe.Id,
				Title = updateRecipe.Title,
				Description = updateRecipe.Description,
				CookingTime = updateRecipe.CookingTime,
				Cuisine = updateRecipe.Cuisine,
				Meal = updateRecipe.Meal,
				Difficulty = updateRecipe.Difficulty,
				CreationDateTime = DateTime.UtcNow,
				Author = author
			};

			_context.Recipes.Update(changedRecipe);
			await _context.SaveChangesAsync();
			return Ok();
		}
		catch (Exception ex)
		{
			return BadRequest(ex.Message);

		}
	}

	[HttpDelete]
	[Route("/delete/{id}")]
	[Authorize]

	public async Task<IActionResult> DeleteRecipe(int recipeId)
	{
		var recipe = await _context.Recipes.FindAsync(recipeId);

		if (recipe is not null)
		{
			_context.Recipes.Remove(recipe);
			await _context.SaveChangesAsync();
			return Ok();
		}
		return BadRequest();
	}

	
	private UserModel GetAuthor()
	{
		var authorObjId = User.Claims.FirstOrDefault(c => c.Type.Contains("objectidentifier"))?.Value;
		var author = _context.Users.FirstOrDefault(u => u.ObjectIdentifier == authorObjId);
		return author;
	}

}
