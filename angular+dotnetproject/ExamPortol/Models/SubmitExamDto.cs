namespace ExamPortol.Models
{
    public class SubmitExamDto
    {

        public int QuizId { get; set; }
        public List<QuestionAnswerDto> Questions { get; set; }

    }
}
