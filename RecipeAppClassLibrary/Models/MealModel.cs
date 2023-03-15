using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppClassLibrary.Models;

public class MealModel
{
    public int Id { get; set; }
	[MaxLength(30)]
	public string MealName { get; set; }
    public string MealDescription { get; set; }

}
