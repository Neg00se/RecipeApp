using Microsoft.EntityFrameworkCore;
using RecipeAppData.DataAccess;
using RecipeAppData.DataAccess.Info;
using RecipeAppData.DataAccess.Recipe;
using RecipeAppData.DataAccess.User;
using RecipeAppData.Models;
using Shared.DtoModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer;

public class RecipeService : IRecipeService
{

	private readonly IRecipeRepository _recipeRepo;
	private readonly IUnitOfWork _unitOfWork;
	private readonly IUserRepository _userRepo;

	private readonly IInfoService _infoService;


	public RecipeService(IRecipeRepository recipeRepo,
					  IUnitOfWork unitOfWork,
					  IUserRepository userRepo,
					  IInfoService infoService)
	{
		_recipeRepo = recipeRepo;
		_unitOfWork = unitOfWork;
		_userRepo = userRepo;
		_infoService = infoService;

	}

	public async Task<List<DisplayRecipeListModel>> GetAllRecipes()
	{
		var recipes = await _recipeRepo.GetAllRecipes();

		List<DisplayRecipeListModel> list = new List<DisplayRecipeListModel>();


		//TODO: Add Automaper to map objects here 
		foreach (var item in recipes)
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

	public async Task CreateRecipe(CreateUpdateRecipeModel newRecipe, UserModel user)
	{
		
		var meal = await _infoService.GetMealAsync(newRecipe.MealId);
		var difficulty = await _infoService.GetDifficultyAsync(newRecipe.DifficultyId);

		//TODO:Add Automapper here 
		RecipeModel recipe = new()
		{
			Id = newRecipe.Id,
			Title = newRecipe.Title,
			Cuisine = newRecipe.Cuisine,
			Meal = meal,
			CookingTime = newRecipe.CookingTime,
			Description = newRecipe.Description,
			Difficulty = difficulty,
			CreationDateTime = DateTime.UtcNow,
			Author = user
		};

		_recipeRepo.CreateRecipe(recipe);
		await _unitOfWork.SaveAsync();

	}

	public async Task UpdateRecipe(CreateUpdateRecipeModel updatedRecipe, UserModel author)
	{
		var recipe = await _recipeRepo.GetRecipe(updatedRecipe.Id);

		var meal = await _infoService.GetMealAsync(updatedRecipe.MealId);
		var difficulty = await _infoService.GetDifficultyAsync(updatedRecipe.DifficultyId);



		//TODO: AUTOMAPPER
		if (recipe is not null)
		{
			recipe.Id = updatedRecipe.Id;
			recipe.Title = updatedRecipe.Title;
			recipe.Description = updatedRecipe.Description;
			recipe.CookingTime = updatedRecipe.CookingTime;
			recipe.Cuisine = updatedRecipe.Cuisine;
			recipe.Meal = meal;
			recipe.Difficulty = difficulty;
			recipe.Author = author;

			_recipeRepo.UpdateRecipe(recipe);
			await _unitOfWork.SaveAsync();
		}
		else
		{
			throw new Exception();
		}
	}

	public async Task DeleteRecipe(int id)
	{
		await _recipeRepo.DeleteRecipe(id);
		await _unitOfWork.SaveAsync();
	}

}

