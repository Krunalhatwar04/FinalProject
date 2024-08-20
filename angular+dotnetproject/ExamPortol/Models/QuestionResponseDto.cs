namespace ExamPortol.Models
{
    public class QuestionResponseDto
    {
        public long QuesId { get; set; }
        public string Questions { get; set; }
        public string Image { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public string Answer { get; set; }
        public QuizResponseDto Quiz { get; set; }
    }
}
