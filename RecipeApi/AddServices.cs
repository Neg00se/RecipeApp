using ServicesLayer;

namespace RecipeApi;

public static class AddServices
{
	public static IServiceCollection AddBusinesLogic(this IServiceCollection services)
	{
		services.AddScoped<IRecipeService, RecipeService>();
		services.AddScoped<IUserService , UserService>();
		services.AddScoped<IRatingService, RatingService>();
		services.AddScoped<IInfoService , InfoService>();

		return services;
	}
}
