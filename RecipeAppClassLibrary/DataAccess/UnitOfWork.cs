using RecipeAppData.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppData.DataAccess;

public class UnitOfWork : IUnitOfWork
{
	private readonly RecipeAppDbContext _context;

	public UnitOfWork(RecipeAppDbContext context)
    {
		_context = context;
	}

	public async Task SaveAsync()
	{
		await _context.SaveChangesAsync();
	}
}
