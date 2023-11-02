using RecipeAppData.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppData.DataAccess.User;

public interface IUserRepository
{
    Task<UserModel> GetByObjId(string objectId);

    void Update(UserModel user);

    Task Create(UserModel user);

}
