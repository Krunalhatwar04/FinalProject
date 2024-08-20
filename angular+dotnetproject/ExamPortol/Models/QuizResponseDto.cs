namespace ExamPortol.Models
{
    public class QuizResponseDto
    {
        public long QuizId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public CategoryDto Category { get; set; }
        public int NumberOfQuestions { get; set; }
    }
}
