using Microsoft.EntityFrameworkCore;
using RecipeAppData.Data;
using RecipeAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppData.DataAccess.Info;

public class InfoRepository : IInfoRepository
{
    private readonly RecipeAppDbContext _context;

    public InfoRepository(RecipeAppDbContext context)
    {
        _context = context;
    }

    public async Task<List<DifficultyModel>> GetAllDifficulties()
    {
        var difficulties = await _context.Difficulty.ToListAsync();
        return difficulties;
    }

    public async Task<List<MealModel>> GetAllMeals()
    {
        var meals = await _context.Meals.ToListAsync();
        return meals;
    }



    public async Task<DifficultyModel> GetDifficultyById(int id)
    {
        var difficulty = await _context.Difficulty.FindAsync(id);
        if (difficulty is not null)
        {
            return difficulty;
        }
        else
        {
            throw new Exception();
        }


    }

    public async Task<MealModel> GetMealById(int id)
    {
        var meal = await _context.Meals.FindAsync(id);
        if (meal is not null)
        {
            return meal;
        }
        else
        {
            throw new Exception();
        }
    }


}
