using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RecipeAppData.Models;
using RecipeAppData.Data;
using ServicesLayer;

namespace RecipeApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]

public class RatingController : ControllerBase
{
	private readonly IRatingService _ratingService;
	private readonly IUserService _userService;

	public RatingController(IRatingService ratingService, IUserService userService)
	{
		_ratingService = ratingService;
		_userService = userService;
	}

	public record Rate(int recipeId, int value);

	[HttpPost]
	[Route("rateRecipe")]
	public async Task RateRecipe(Rate rateInf)
	{
		var user = await _userService.GetCurrentUser(User);

		await _ratingService.RateRecipe(rateInf.recipeId, rateInf.value, user);
	}




	

	[HttpDelete]
	[Route("deleteRate/{recipeId}")]
	public async Task<IActionResult> DeleteRate(int recipeId)
	{
		try
		{
			var user = await _userService.GetCurrentUser(User);
			await _ratingService.DeleteRate(recipeId, user);
			
			return Ok();
		}
		catch (Exception ex)
		{

			return BadRequest(ex.Message);
		}

	}

	

}
