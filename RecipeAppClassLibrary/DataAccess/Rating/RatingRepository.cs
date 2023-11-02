using Microsoft.EntityFrameworkCore;
using RecipeAppData.Data;
using RecipeAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppData.DataAccess.Rating;

public class RatingRepository : IRatingRepository
{
    private readonly RecipeAppDbContext _context;

    public RatingRepository(RecipeAppDbContext context)
    {
        _context = context;
    }

    public async Task AddRate(RatingModel rate)
    {
        await _context.Ratings.AddAsync(rate);
    }

    public void DeleteRate(RatingModel rate)
    {
        _context.Ratings.Remove(rate);
    }

    public async Task<RatingModel> GetRating(int recipeId, Guid userId)
    {
        var rate = await _context.Ratings.FirstOrDefaultAsync(r => r.RecipeModelId == recipeId && r.UserModelId == userId);

        if (rate is not null)
        {
            return rate;
        }
        else
        {
            throw new Exception();
        }
    }

    public bool IsRateExist(int recipeId, Guid userId)
    {
        return _context.Ratings.Any(r => r.RecipeModelId == recipeId && r.UserModelId == userId);
    }
}
