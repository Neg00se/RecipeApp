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
	public DbSet<MealModel> Meals { get; set; }
	public DbSet<DifficultyModel> Difficulty { get; set; }
	public DbSet<CuisineModel> Cuisines { get; set; }
	public DbSet<RatingModel> Ratings { get; set; }

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<RatingModel>()
			.HasOne<UserModel>()
			.WithMany(e => e.UserRates)
			.HasForeignKey(e => e.UserModelId)
			.OnDelete(DeleteBehavior.Restrict);
	}
}
