    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using ExamPortol.Models;
    using ExamPortol.Data;

namespace ExamPortol.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly DataContext _context;

        public QuestionsController(DataContext context)
        {
            _context = context;
        }

        /* [HttpPost]
         public async Task<IActionResult> CreateQuestion([FromBody] QuestionDto questionDto)
         {
             if (!ModelState.IsValid)
                 return BadRequest(ModelState);

             var question = new Question
             {
                 Questions = questionDto.Questions,
                 Option1 = questionDto.Option1,
                 Option2 = questionDto.Option2,
                 Option3 = questionDto.Option3,
                 Option4 = questionDto.Option4,
                 Answer = questionDto.Answer,
                 QuizId = questionDto.QuizId
             };

             _context.Questions.Add(question);
             await _context.SaveChangesAsync();

             return CreatedAtAction(nameof(GetQuestionById), new { id = question.QuesId }, question);
         }*/
        /*
        [HttpPost]
        public async Task<IActionResult> CreateQuestion([FromBody] QuestionDto questionDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Create the new question
            var question = new Question
            {
                Questions = questionDto.Questions,
                Option1 = questionDto.Option1,
                Option2 = questionDto.Option2,
                Option3 = questionDto.Option3,
                Option4 = questionDto.Option4,
                Answer = questionDto.Answer,
                QuizId = questionDto.QuizId
            };

            // Find the associated quiz
            var quiz = await _context.Quizzes.FindAsync(questionDto.QuizId);
            if (quiz == null)
            {
                return NotFound($"Quiz with id: {questionDto.QuizId} doesn't exist");
            }

            // Update the number of questions in the quiz
            quiz.NumberOfQuestions++;
            _context.Quizzes.Update(quiz);

            // Add the new question to the database
            _context.Questions.Add(question);

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error saving data: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetQuestionById), new { id = question.QuesId }, question);
        */
        [HttpPost]
        public async Task<IActionResult> CreateQuestion([FromBody] QuestionDto questionDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Create the new question
            var question = new Question
            {
                Questions = questionDto.Questions,
                Option1 = questionDto.Option1,
                Option2 = questionDto.Option2,
                Option3 = questionDto.Option3,
                Option4 = questionDto.Option4,
                Answer = questionDto.Answer,
                QuizId = questionDto.QuizId
            };

            // Find the associated quiz
            var quiz = await _context.Quizzes.FindAsync(questionDto.QuizId);
            if (quiz == null)
            {
                return NotFound($"Quiz with id: {questionDto.QuizId} doesn't exist");
            }

            // Update the number of questions in the quiz
            quiz.NumberOfQuestions++;
            _context.Quizzes.Update(quiz);

            // Add the new question to the database
            _context.Questions.Add(question);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error saving data: {ex.Message}");
            }

            return CreatedAtAction(nameof(GetQuestionById), new { id = question.QuesId }, question);

        }

        // GET: api/questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetAllQuestions()
        {
            var questions = await _context.Questions.ToListAsync();
            return Ok(questions);
        }

        // GET: api/questions/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestionById(long id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
                return NotFound();

            return Ok(question);
        }

        // PUT: api/questions/{id}
        [HttpPut("{quesId}")]
        public async Task<IActionResult> UpdateQuestion(long quesId, [FromBody] QuestionDto questionDto)
        {
            // var question = await _context.Questions.FindAsync(id);
            var question = _context.Questions
         .Include(q => q.Quiz) 
         .FirstOrDefault(q => q.QuesId == quesId);
            if (question == null)
                return NotFound("Question not found");

            question.Questions = questionDto.Questions;
            question.Option1 = questionDto.Option1;
            question.Option2 = questionDto.Option2;
            question.Option3 = questionDto.Option3;
            question.Option4 = questionDto.Option4;
            question.Answer = questionDto.Answer;
            question.QuizId = questionDto.QuizId;

            // Save changes
            _context.Questions.Update(question);
            await _context.SaveChangesAsync();

            return Ok(question);
        }

        // DELETE: api/questions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(long id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
                return NotFound();

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Question deleted successfully." });
        }

        // GET: api/questions/by-quiz/{quizId}
        [HttpGet("by-quiz/{quizId}")]
        public async Task<ActionResult<IEnumerable<QuestionResponseDto>>> GetQuestionsByQuiz(long quizId)
        {
            var questions = await _context.Questions
                .Where(q => q.QuizId == quizId)
                .Select(q => new QuestionResponseDto
                {
                    QuesId = q.QuesId,
                    Questions = q.Questions,
                    Image = q.Image,
                    Option1 = q.Option1,
                    Option2 = q.Option2,
                    Option3 = q.Option3,
                    Option4 = q.Option4,
                    Answer = q.Answer,
                    Quiz = new QuizResponseDto
                    {
                        QuizId = q.Quiz.QuizId, 
                        Title = q.Quiz.Title,
                        Description = q.Quiz.Description,
                        Category = new CategoryDto
                        {
                            CatId = q.Quiz.Category.CatId,
                            Title = q.Quiz.Category.Title,
                            Description = q.Quiz.Category.Description
                        }
                    }
                }).ToListAsync();

            return Ok(questions);
        }
       

        [HttpPost("submit-exam")]
        public async Task<IActionResult> SubmitExam([FromBody] SubmitExamDto submitExamDto)
        {
            if (submitExamDto == null || submitExamDto.Questions == null || !submitExamDto.Questions.Any())
            {
                return BadRequest("Invalid exam submission.");
            }

            var quiz = await _context.Quizzes
                .Include(q => q.Questions)
                .FirstOrDefaultAsync(q => q.QuizId == submitExamDto.QuizId);

            if (quiz == null)
            {
                return NotFound("Quiz not found.");
            }

            int correctAnswers = 0;
            int totalQuestions = quiz.Questions.Count;
            double totalMarks = totalQuestions * 2; 
            double marksPerQuestion = 2;
            double obtainedMarks = 0;

            var results = new List<QuestionResultDto>();

            foreach (var answer in submitExamDto.Questions)
            {
                var question = quiz.Questions.FirstOrDefault(q => q.QuesId == answer.QuesId);
                if (question != null)
                {
                    bool isCorrect = question.Answer == answer.GivenAnswer;
                    if (isCorrect)
                    {
                        correctAnswers++;
                        obtainedMarks += marksPerQuestion;
                    }

                    results.Add(new QuestionResultDto
                    {
                        QuesId = question.QuesId,
                        QuestionText = question.Questions,
                        UserAnswer = answer.GivenAnswer,
                        CorrectAnswer = question.Answer,
                        IsCorrect = isCorrect
                    });
                }
            }

            var result = new
            {
                MarksGot = obtainedMarks,
                CorrectAnswers = correctAnswers,
                Attempted = submitExamDto.Questions.Count(q => !string.IsNullOrWhiteSpace(q.GivenAnswer)),
                QuestionResults = results
            };

            return Ok(result);


        }
    }
}
