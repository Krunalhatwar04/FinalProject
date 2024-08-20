using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExamPortol.Models
{
    public class QuestionT
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long QuesId { get; set; }

        [Required]
        public string Question { get; set; }

        public string? Image { get; set; }



        [Required]
        public string Option1 { get; set; }

        [Required]
        public string Option2 { get; set; }

        [Required]
        public string Option3 { get; set; }

        [Required]
        public string Option4 { get; set; }
        public string Answer { get; set; }




        [ForeignKey("Quiz")]
        public long? QuizId { get; set; }

        public virtual Quiz? Quiz { get; set; }
    }
}
