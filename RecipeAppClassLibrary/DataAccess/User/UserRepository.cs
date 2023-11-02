using Microsoft.EntityFrameworkCore;
using RecipeAppData.Data;
using RecipeAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppData.DataAccess.User;

public class UserRepository : IUserRepository
{
    private readonly RecipeAppDbContext _context;

    public UserRepository(RecipeAppDbContext context)
    {
        _context = context;
    }

    public async Task Create(UserModel user)
    {
        await _context.Users.AddAsync(user);
    }

    public async Task<UserModel> GetByObjId(string objectId)
    {
        var user = await _context.Users.Include(r => r.UserRates)
                                 .Include(u => u.UserRecipes)
                                 .FirstOrDefaultAsync(u => u.ObjectIdentifier == objectId);

        if (user is not null)
        {
            return user;
        }
        else
        {
            throw new Exception();
        }
    }

    public void Update(UserModel user)
    {
        _context.Users.Update(user);
    }
}
