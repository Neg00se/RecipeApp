﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeAppClassLibrary.Data;
using RecipeAppClassLibrary.Models;

namespace RecipeApi.Controllers;

[Route("api/[controller]")]
[ApiController]


public class RecipesController : ControllerBase
{
	private readonly RecipeAppDbContext _context;

	public RecipesController(RecipeAppDbContext context)
	{
		_context = context;
	}

	[HttpGet]
	[Route("GetAllRecipes")]
	public async Task<List<RecipeModel>> GetAllRecipes()
	{
		var allRecipes = await _context.Recipes.Include(c=> c.Cuisine)
												.Include(d=> d.Difficulty)
												.Include(m=>m.Meal)
												.Include(u=> u.Author).ToListAsync();

		return allRecipes;
	}

	[HttpPost]
	public async Task<IActionResult> CreateRecipe(RecipeModel recipe)
	{
		try
		{
			_context.Recipes.Add(recipe);
			await _context.SaveChangesAsync();
			return Ok();
		}
		catch (Exception ex)
		{

			return BadRequest(ex.Message);
		
		}
	}

	[HttpPut]
	public async Task<IActionResult> UpdateRecipe(RecipeModel updateRecipe)
	{
		try
		{
			_context.Recipes.Update(updateRecipe);
			await _context.SaveChangesAsync();
			return Ok();
		}
		catch (Exception ex)
		{
			return BadRequest(ex.Message);
			
		}
	}

	[HttpDelete]
	[Route ("/delete/{id}")]
	public async Task<IActionResult> DeleteRecipe(int recipeId)
	{
		var recipe = await _context.Recipes.FindAsync(recipeId);

		if (recipe is not null)
		{
			_context.Recipes.Remove(recipe);
			await _context.SaveChangesAsync();
			return Ok();
		}
		return BadRequest();
	}

}