using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;
using RecipeAppClassLibrary.Data;
using RecipeAppClassLibrary.Models;
using System.Security.Claims;

namespace RecipeApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
	private readonly RecipeAppDbContext _context;

	public UserController(RecipeAppDbContext context)
    {
		_context = context;
	}


	[HttpGet]
	public async Task<UserProfileModel> GetUserProfile()
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

		List<RecipeModel> recipes = _context.Recipes.Where(x=> x.Author.Id.ToString() == userId).ToList();

		var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);


		UserProfileModel profile = new()
		{
			UserName = user.UserName ,
			Email = user.Email,
			AuthoredRecipesCount = recipes.Count , 
			Recipes = recipes
		};


		return profile;	 

	}


}
