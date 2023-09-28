using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeAppClassLibrary.Data;
using RecipeAppClassLibrary.Models;

namespace RecipeApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]

public class RatingController : ControllerBase
{
	private readonly RecipeAppDbContext _context;
	public RatingController(RecipeAppDbContext context)
	{
		_context = context;
	}


	public record Rate (int recipeId , int value);

	[HttpPost]
	[Route("rateRecipe")]
	public async Task RateRecipe(Rate rateInf)
	{
		Guid userId = GetUser().Id;
		bool rateExist = _context.Ratings.Any(r=> r.RecipeModelId == rateInf.recipeId && r.UserModelId ==userId);
		if (rateExist == false)
		{
			RatingModel rate = new RatingModel
			{
				RecipeModelId =rateInf.recipeId ,
				Value = rateInf.value,
				UserModelId = userId

			};

			await _context.Ratings.AddAsync(rate);
			await _context.SaveChangesAsync(); 
		}
		else
		{
			await ChangeRate(rateInf);
		}
	}



	
	private async Task ChangeRate(Rate rateInf)
	{
		Guid userId = GetUser().Id;
		RatingModel rate = _context.Ratings.FirstOrDefault(r => r.RecipeModelId == rateInf.recipeId && r.UserModelId == userId);

		if (rate is not null)
		{
			rate.Value = rateInf.value;
			await _context.SaveChangesAsync();
			
		}
	}

	[HttpDelete]
	[Route("deleteRate/{recipeId}")]
	public async Task<IActionResult> DeleteRate(int recipeId)
	{
		try
		{
			Guid userId = GetUser().Id;
			RatingModel rate = _context.Ratings.First(r => r.RecipeModelId == recipeId && r.UserModelId == userId);
			_context.Ratings.Remove(rate);
			await _context.SaveChangesAsync();
			return Ok();
		}
		catch (Exception ex)
		{

			return BadRequest(ex.Message);
		}

	}

	private UserModel GetUser()
	{
		var authorObjId = User.Claims.FirstOrDefault(c => c.Type.Contains("objectidentifier"))?.Value;
		var author = _context.Users.FirstOrDefault(u => u.ObjectIdentifier == authorObjId);
		return author;
	}

}
