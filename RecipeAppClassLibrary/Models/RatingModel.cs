using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecipeAppClassLibrary.Models
{
	public class RatingModel
	{
        public int Id { get; set; }

        public int Value { get; set; }
        [Column("UserId")]
        public Guid UserModelId { get; set; }
        [Column("RecipeId")]
        public int RecipeModelId { get; set; }
    }
}
