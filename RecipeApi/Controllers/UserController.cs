using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeAppData.Data;
using RecipeAppData.Models;
using ServicesLayer;
using Shared.DtoModels;
using System.Security.Claims;

namespace RecipeApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserController : ControllerBase
{
	private readonly IUserService _userService;

	public UserController(IUserService userService)
	{
		_userService = userService;
	}


	[HttpGet]
	[Authorize]
	[Route("Profile")]
	public async Task<UserProfileModel> GetLoggedInUserProfile()
	{
		var user = await _userService.GetCurrentUser(User);

		//TODO: Automapper
		UserProfileModel profile = new()
		{
			Id = user.Id,
			UserName = user.UserName,
			Email = user.Email,
			AuthoredRecipesCount = user.UserRecipes.Count,
			Recipes = user.UserRecipes,
			UserRates = user.UserRates

		};


		return profile;

	}

	[HttpPost]

	public async Task<IActionResult> CreateOrUpdateUser()
	{
		try
		{
			await _userService.CreateOrUpdateUser(User);
			return Ok();
		}
		catch (Exception ex)
		{

			return BadRequest(ex.Message);
		}

	}

}
