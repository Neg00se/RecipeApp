using RecipeAppData.Models;
using System.Security.Claims;

namespace ServicesLayer
{
	public interface IUserService
	{
		Task CreateOrUpdateUser(ClaimsPrincipal userPrincipal);
		Task<UserModel> GetCurrentUser(ClaimsPrincipal userPrincipal);
	}
}