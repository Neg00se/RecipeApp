using Microsoft.EntityFrameworkCore;
using RecipeAppClassLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppClassLibrary.Data;

public class RecipeAppDbContext : DbContext
{

	public RecipeAppDbContext(DbContextOptions options) : base(options)
	{
	}

	public DbSet<UserModel> Users { get; set; }
	public DbSet<RecipeModel> Recipes { get; set; }
	DbSet<MealModel> Meals { get; set; }
	DbSet<DifficultyModel> Difficulty { get; set; }
	public DbSet<CuisineModel> Cuisines { get; set; }
}
