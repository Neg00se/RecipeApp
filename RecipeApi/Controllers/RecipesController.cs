using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeAppData.Models;
using RecipeAppData.Data;
using Shared.DtoModels;
using ServicesLayer;

namespace RecipeApi.Controllers;

[Route("api/[controller]")]
[ApiController]


public class RecipesController : ControllerBase
{
	private readonly IRecipeService _recipeService;
	private readonly IUserService _userService;

	public RecipesController(IRecipeService recipeService , IUserService userService)
	{
		_recipeService = recipeService;
		_userService = userService;
	}


	[HttpGet]
	[Route("GetAllRecipes")]
	public async Task<List<DisplayRecipeListModel>> GetAllRecipes()
	{
		return await _recipeService.GetAllRecipes();
    }

	[HttpPost]
	[Authorize]
	[Route("CreateRecipe")]
	public async Task<IActionResult> CreateRecipe(CreateUpdateRecipeModel newRecipe)
	{
		try
		{
			var author = await _userService.GetCurrentUser(User);

			await _recipeService.CreateRecipe(newRecipe, author);

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
			var user = await _userService.GetCurrentUser(User);

			await _recipeService.UpdateRecipe(updateRecipe, user);
			
				return Ok();
			

			
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
		try
		{
			await _recipeService.DeleteRecipe(id);
			return Ok();
		}
		catch (Exception)
		{

			return BadRequest();
		}
	}


	
}
