using System.ComponentModel.DataAnnotations;

namespace ExamPortol.Models
{
    public class CategoryDto

    {
        public long CatId { get; set; }
        [Required]
        public string? Title { get; set; }
        [Required]
        public string? Description { get; set; }
        
    }
}
