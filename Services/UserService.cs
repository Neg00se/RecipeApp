using Microsoft.EntityFrameworkCore;
using RecipeAppData.DataAccess;
using RecipeAppData.DataAccess.User;
using RecipeAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ServicesLayer;

public class UserService : IUserService
{
	private readonly IUserRepository _userRepo;
	private readonly IUnitOfWork _unitOfWork;

	public UserService(IUserRepository userRepo, IUnitOfWork unitOfWork)
	{
		_userRepo = userRepo;
		_unitOfWork = unitOfWork;
	}


	public async Task CreateOrUpdateUser(ClaimsPrincipal userPrincipal)
	{

		//TODO: Think how to rework this logic

		string objectId = userPrincipal.Claims.FirstOrDefault(c => c.Type.Contains("objectidentifier"))?.Value;

		var user = await _userRepo.GetByObjId(objectId) ?? new();

		string firstName = userPrincipal.Claims.FirstOrDefault(c => c.Type.Contains("givenname"))?.Value;
		string surname = userPrincipal.Claims.FirstOrDefault(c => c.Type.Contains("surname"))?.Value;
		string userName = userPrincipal.Identity.Name;
		string email = userPrincipal.Claims.FirstOrDefault(c => c.Type.Contains("email"))?.Value;
		bool isDirty = false;

		if (objectId.Equals(user.ObjectIdentifier) == false)
		{
			isDirty = true;
			user.ObjectIdentifier = objectId;
		}
		if (firstName.Equals(user.Name) == false)
		{
			isDirty = true;
			user.Name = firstName;
		}
		if (surname.Equals(user.Surname) == false)
		{
			isDirty = true;
			user.Surname = surname;
		}
		if (userName.Equals(user.UserName) == false)
		{
			isDirty = true;
			user.UserName = userName;
		}
		if (email.Equals(user.Email) == false)
		{
			isDirty = true;
			user.Email = email;
		}
		if (isDirty)
		{
			if (user.Id.ToString() is null)
			{
				await _userRepo.Create(user);
			}
			else
			{
				_userRepo.Update(user);
			}

			await _unitOfWork.SaveAsync();
		}
	}


	public async Task<UserModel> GetCurrentUser(ClaimsPrincipal userPrincipal)
	{
		var userObjId = userPrincipal.Claims.FirstOrDefault(c => c.Type.Contains("objectidentifier"))?.Value!;
		var user = await _userRepo.GetByObjId(userObjId);
		return user;
	}

}
