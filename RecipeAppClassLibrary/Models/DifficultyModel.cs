using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppClassLibrary.Models;

public class DifficultyModel
{
    public int Id { get; set; }
	[MaxLength(30)]
	public string DifficultyName { get; set; }

    public string DifficultyDescription { get; set; }
}
