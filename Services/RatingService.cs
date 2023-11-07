using RecipeAppData.DataAccess;
using RecipeAppData.DataAccess.Rating;
using RecipeAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer;

public class RatingService : IRatingService
{
	private readonly IRatingRepository _ratingRepo;
	private readonly IUnitOfWork _unitOfWork;

	public RatingService(IRatingRepository ratingRepo, IUnitOfWork unitOfWork)
	{
		_ratingRepo = ratingRepo;
		_unitOfWork = unitOfWork;
	}

	public async Task RateRecipe(int recipeId, int value, UserModel user)
	{
		bool isExist = _ratingRepo.IsRateExist(recipeId, user.Id);
		if (isExist == false)
		{
			RatingModel rate = new RatingModel
			{
				RecipeModelId = recipeId,
				Value = value,
				UserModelId = user.Id

			};
			await _ratingRepo.AddRate(rate);
		}
		else
		{
			var rate = await _ratingRepo.GetRating(recipeId, user.Id);
			rate.Value = value;
			_ratingRepo.UpdateRate(rate);
		}

		await _unitOfWork.SaveAsync();
	}


	public async Task DeleteRate(int recipeId, UserModel user)
	{
		var rate = await _ratingRepo.GetRating(recipeId, user.Id);
		_ratingRepo.DeleteRate(rate);
		await _unitOfWork.SaveAsync();
	}

}
