using RecipeAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppData.DataAccess.Rating;

public interface IRatingRepository
{
    Task AddRate(RatingModel rate);

    Task<RatingModel> GetRating(int recipeId, Guid userId);

    bool IsRateExist(int recipeId, Guid userId);

    void UpdateRate(RatingModel rate);

    void DeleteRate(RatingModel rate);
}
