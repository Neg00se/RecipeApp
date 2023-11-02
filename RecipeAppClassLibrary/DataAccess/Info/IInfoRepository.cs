using RecipeAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppData.DataAccess.Info;

public interface IInfoRepository
{
    Task<List<MealModel>> GetAllMeals();
    Task<MealModel> GetMealById(int id);

    Task<List<DifficultyModel>> GetAllDifficulties();
    Task<DifficultyModel> GetDifficultyById(int id);
}
