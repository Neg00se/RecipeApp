using Microsoft.EntityFrameworkCore;
using RecipeAppData.Data;
using RecipeAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppData.DataAccess.Recipe;

public class RecipeRepository : IRecipeRepository
{
    private readonly RecipeAppDbContext _context;

    public RecipeRepository(RecipeAppDbContext context)
    {
        _context = context;
    }

    public void CreateRecipe(RecipeModel recipe)
    {

        _context.Recipes.Add(recipe);
    }

    public async Task DeleteRecipe(int id)
    {
        var recipe = await _context.Recipes.FindAsync(id);
        if (recipe is not null)
        {
            _context.Recipes.Remove(recipe);
        }
    }

    public async Task<List<RecipeModel>> GetAllRecipes()
    {
        var recipes = await _context.Recipes.Include(r => r.Rating)
                        .Include(r => r.Author)
                        .Include(r => r.Cuisine)
                        .Include(r => r.Meal)
                        .Include(r => r.Difficulty).ToListAsync();

        return recipes;
    }

    public void UpdateRecipe(RecipeModel recipe)
    {
        var updateRecipe = _context.Recipes.FirstOrDefault(r => r.Id == recipe.Id);

        if (updateRecipe is not null) _context.Recipes.Update(updateRecipe);

    }
}
