using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ExamPortol.Models
{
    public class Quiz
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long QuizId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public int NumberOfQuestions { get; set; }

       

        [Required]
        [ForeignKey("Category")]
        public long CategoryId { get; set; }

        // The navigation property should not be required in the JSON payload
        public virtual Category Category { get; set; }

        [JsonIgnore]
        public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
    }
}
