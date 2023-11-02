using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppData.DataAccess;

public interface IUnitOfWork
{

	Task SaveAsync();
}
