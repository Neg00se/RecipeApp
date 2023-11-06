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
	private readonly IInfoRepository _infoRepo;

	public RecipeService(IRecipeRepository recipeRepo,
					  IUnitOfWork unitOfWork,
					  IUserRepository userRepo,
					  IInfoRepository infoRepo)
	{
		_recipeRepo = recipeRepo;
		_unitOfWork = unitOfWork;
		_userRepo = userRepo;
		_infoRepo = infoRepo;
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

	public async Task CreateRecipe(CreateUpdateRecipeModel newRecipe, string userObjId)
	{
		var author = await _userRepo.GetByObjId(userObjId);
		var meal = await _infoRepo.GetMealById(newRecipe.MealId);
		var difficulty = await _infoRepo.GetDifficultyById(newRecipe.DifficultyId);

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
			Author = author
		};

		_recipeRepo.CreateRecipe(recipe);
		await _unitOfWork.SaveAsync();

	}

	public async Task UpdateRecipe(CreateUpdateRecipeModel newRecipe)
	{
		throw new NotImplementedException();
	}

	public async Task DeleteRecipe(int id)
	{
		await _recipeRepo.DeleteRecipe(id);
		await _unitOfWork.SaveAsync();
	}

}
