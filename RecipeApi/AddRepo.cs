using RecipeAppData.DataAccess;
using RecipeAppData.DataAccess.Info;
using RecipeAppData.DataAccess.Rating;
using RecipeAppData.DataAccess.Recipe;
using RecipeAppData.DataAccess.User;

namespace RecipeApi
{
	public static class AddRepo
	{

		public static IServiceCollection AddRepositories(this IServiceCollection services)
		{
			services.AddScoped<IRecipeRepository , RecipeRepository>();
			services.AddScoped<IUserRepository, UserRepository>();
			services.AddScoped<IInfoRepository, InfoRepository>();
			services.AddScoped<IUnitOfWork, UnitOfWork>();
			services.AddScoped<IRatingRepository, RatingRepository>();

			return services;
		}
	}
}
