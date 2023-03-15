using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppClassLibrary.Models;

public class UserModel
{
    public Guid Id { get; set; }
    public string ObjectIdentifier { get; set; } = null!;
	[MaxLength(20)]
	public string UserName { get; set; } = null!;
	[MaxLength(50)]

	public string Name { get; set; } = null!;
	[MaxLength(50)]

	public string Surname { get; set; } = null!;
	[Required]
	[MaxLength(50)]
	public string Email { get; set; } = null!;


}
