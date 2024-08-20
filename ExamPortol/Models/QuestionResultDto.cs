namespace ExamPortol.Models
{
    public class QuestionResultDto
    {
        public long QuesId { get; set; }
        public string QuestionText { get; set; }
        public string UserAnswer { get; set; }
        public string CorrectAnswer { get; set; }
        public bool IsCorrect { get; set; }
    }
}
