using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppData.Models;

public class CuisineModel
{
	public int Id { get; set; }
	[MaxLength(50)]
	public string CuisineName { get; set; }
	public string CuisineDescription { get; set; }
}
