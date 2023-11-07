using RecipeAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppData.DataAccess.Recipe;

public interface IRecipeRepository
{
    Task<List<RecipeModel>> GetAllRecipes();

    void CreateRecipe(RecipeModel recipe);

    Task<RecipeModel> GetRecipe(int id);

    Task DeleteRecipe(int id);

    void UpdateRecipe(RecipeModel recipe);

}
