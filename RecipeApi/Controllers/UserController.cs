using Microsoft.AspNetCore.Authorization;
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
[Authorize]
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
		var userId = User.Claims.FirstOrDefault(c => c.Type.Contains("objectidentifier"))?.Value;

		List<RecipeModel> recipes = _context.Recipes.Where(x => x.Author.Id.ToString() == userId).ToList();

		var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == userId);


		UserProfileModel profile = new()
		{
			UserName = user.UserName,
			Email = user.Email,
			AuthoredRecipesCount = recipes.Count,
			Recipes = recipes
		};


		return profile;

	}

	[HttpPost]

	public async Task<IActionResult> CreateUser()
	{
		try
		{
			await CreateOrUpdate();
			await _context.SaveChangesAsync();
			return Ok();
		}
		catch (Exception ex)
		{

			return BadRequest(ex.Message);
		}

	}


	private async Task CreateOrUpdate()
	{

		string objectId = User.Claims.FirstOrDefault(c => c.Type.Contains("objectidentifier"))?.Value;

		var user = await _context.Users.FirstOrDefaultAsync(u => u.ObjectIdentifier == objectId) ?? new();

		string firstName = User.Claims.FirstOrDefault(c => c.Type.Contains("givenname"))?.Value;
		string surname = User.Claims.FirstOrDefault(c => c.Type.Contains("surname"))?.Value;
		string userName = User.Identity.Name;
		string email = User.Claims.FirstOrDefault(c => c.Type.Contains("email"))?.Value;
		bool isDirty = false;

		if (objectId.Equals(user.ObjectIdentifier) == false)
		{
			isDirty = true;
			user.ObjectIdentifier = objectId;
		}
		if (firstName.Equals(user.Name) == false)
		{
			isDirty = true;
			user.Name = firstName;
		}
		if (surname.Equals(user.Surname) == false)
		{
			isDirty = true;
			user.Surname = surname;
		}
		if (userName.Equals(user.UserName) == false)
		{
			isDirty = true;
			user.UserName = userName;
		}
		if (email.Equals(user.Email) == false)
		{
			isDirty = true;
			user.Email = email;
		}
		if (isDirty)
		{
			if (user.Id.ToString() is null)
			{
				_context.Users.Add(user);
			}
			else
			{
				_context.Users.Update(user);
			}
		}



	}


}
