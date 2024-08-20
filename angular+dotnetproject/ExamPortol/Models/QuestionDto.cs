namespace ExamPortol.Models
{
    public class QuestionDto
    {

        public string Questions { get; set; }
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }
        public string Answer { get; set; }
        public long QuizId { get; set; }
    }
}
