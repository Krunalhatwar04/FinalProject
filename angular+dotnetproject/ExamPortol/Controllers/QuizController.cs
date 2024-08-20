using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExamPortol.Models;
using System.Linq;
using ExamPortol.Data;

namespace ExamPortol.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly DataContext _context;

        public QuizController(DataContext context)
        {
            _context = context;
        }

        /* [HttpPost]
         public IActionResult AddQuiz([FromBody] QuizDto quizDto)
         {
             if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }

             var category = _context.Categories.Find(quizDto.CategoryId);
             if (category == null)
             {
                 return NotFound($"Category with id: {quizDto.CategoryId} doesn't exist");
             }

             var quiz = new Quiz
             {
                 Title = quizDto.Title,
                 Description = quizDto.Description,
                 CategoryId = quizDto.CategoryId,

             };

             _context.Quizzes.Add(quiz);
             _context.SaveChanges();

             var quizResponseDto = new QuizResponseDto
             {
                 QuizId = quiz.QuizId,
                 Title = quiz.Title,
                 Description = quiz.Description,
                 Category = new CategoryDto
                 {
                     CatId = category.CatId,
                     Title = category.Title,
                     Description = category.Description
                 }
             };

             return Ok(quizResponseDto);
         }

         [HttpPut("{quizId}")]
         public IActionResult UpdateQuiz(long quizId, [FromBody] QuizDto quizDto)
         {
             if (!ModelState.IsValid)
             {
                 return BadRequest(ModelState);
             }

             var existingQuiz = _context.Quizzes
                 .Include(q => q.Category)
                 .FirstOrDefault(q => q.QuizId == quizId);

             if (existingQuiz == null)
             {
                 return NotFound($"Quiz with id: {quizId} doesn't exist");
             }

             existingQuiz.Title = quizDto.Title;
             existingQuiz.Description = quizDto.Description;
             existingQuiz.CategoryId = quizDto.CategoryId;

             _context.Quizzes.Update(existingQuiz);
             _context.SaveChanges();

             var quizResponseDto = new QuizResponseDto
             {
                 QuizId = existingQuiz.QuizId,
                 Title = existingQuiz.Title,
                 Description = existingQuiz.Description,
                 Category = new CategoryDto
                 {
                     CatId = existingQuiz.Category.CatId,
                     Title = existingQuiz.Category.Title,
                     Description = existingQuiz.Category.Description
                 }
             };

             return Ok(quizResponseDto);
         }

         [HttpGet("{quizId}")]
         public IActionResult GetQuiz(long quizId)
         {
             var quiz = _context.Quizzes
                 .Include(q => q.Category)
                 .FirstOrDefault(q => q.QuizId == quizId);

             if (quiz == null)
             {
                 return NotFound($"Quiz with id: {quizId} doesn't exist");
             }

             var quizResponseDto = new QuizResponseDto
             {
                 QuizId = quiz.QuizId,
                 Title = quiz.Title,
                 Description = quiz.Description,
                 Category = new CategoryDto
                 {
                     CatId = quiz.Category.CatId,
                     Title = quiz.Category.Title,
                     Description = quiz.Category.Description
                 }
             };

             return Ok(quizResponseDto);
         }
         [HttpDelete("{quizId}")]
         public IActionResult DeleteQuiz(long quizId)
         {
             var quiz = _context.Quizzes.Find(quizId);
             if (quiz == null)
             {
                 return NotFound($"Quiz with id: {quizId} doesn't exist");
             }

             _context.Quizzes.Remove(quiz);
             _context.SaveChanges();

             return NoContent();
         }

         [HttpGet]
         public IActionResult GetAllQuizzes()
         {
             var quizzes = _context.Quizzes
                 .Include(q => q.Category)
                 .Select(q => new QuizResponseDto
                 {
                     QuizId = q.QuizId,
                     Title = q.Title,
                     Description = q.Description,
                     Category = new CategoryDto
                     {
                         CatId = q.Category.CatId,
                         Title = q.Category.Title,
                         Description = q.Category.Description
                     }
                 }).ToList();

             return Ok(quizzes);
         }
         [HttpGet("category/{cid}")]
         public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizzesByCategory(long cid)
         {
             var quizzes = await _context.Quizzes
                 .Where(q => q.CategoryId == cid)
                 .ToListAsync();

             if (quizzes == null || quizzes.Count == 0)
             {
                 return NotFound(new { message = "No quizzes found for this category." });
             }

             return Ok(quizzes);
         }*/

        [HttpPost]
        public IActionResult AddQuiz([FromBody] QuizDto quizDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var category = _context.Categories.Find(quizDto.CategoryId);
            if (category == null)
            {
                return NotFound($"Category with id: {quizDto.CategoryId} doesn't exist");
            }

            var quiz = new Quiz
            {
                Title = quizDto.Title,
                Description = quizDto.Description,
                CategoryId = quizDto.CategoryId,

            };

            _context.Quizzes.Add(quiz);
            _context.SaveChanges();

            var quizResponseDto = new QuizResponseDto
            {
                QuizId = quiz.QuizId,
                Title = quiz.Title,
                Description = quiz.Description,
                Category = new CategoryDto
                {
                    CatId = category.CatId,
                    Title = category.Title,
                    Description = category.Description
                }
            };

            return Ok(quizResponseDto);
        }

        [HttpPut("{quizId}")]
        public IActionResult UpdateQuiz(long quizId, [FromBody] QuizDto quizDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingQuiz = _context.Quizzes
                .Include(q => q.Category)
                .FirstOrDefault(q => q.QuizId == quizId);

            if (existingQuiz == null)
            {
                return NotFound($"Quiz with id: {quizId} doesn't exist");
            }

            existingQuiz.Title = quizDto.Title;
            existingQuiz.Description = quizDto.Description;
            existingQuiz.CategoryId = quizDto.CategoryId;

            _context.Quizzes.Update(existingQuiz);
            _context.SaveChanges();

            var quizResponseDto = new QuizResponseDto
            {
                QuizId = existingQuiz.QuizId,
                Title = existingQuiz.Title,
                Description = existingQuiz.Description,
                Category = new CategoryDto
                {
                    CatId = existingQuiz.Category.CatId,
                    Title = existingQuiz.Category.Title,
                    Description = existingQuiz.Category.Description
                }
            };

            return Ok(quizResponseDto);
        }

        [HttpGet("{quizId}")]
        public IActionResult GetQuiz(long quizId)
        {
            var quiz = _context.Quizzes
                .Include(q => q.Category)
                .FirstOrDefault(q => q.QuizId == quizId);

            if (quiz == null)
            {
                return NotFound($"Quiz with id: {quizId} doesn't exist");
            }

            var quizResponseDto = new QuizResponseDto
            {
                QuizId = quiz.QuizId,
                Title = quiz.Title,
                Description = quiz.Description,
                Category = new CategoryDto
                {
                    CatId = quiz.Category.CatId,
                    Title = quiz.Category.Title,
                    Description = quiz.Category.Description
                },
                NumberOfQuestions = _context.Questions.Count(question => question.QuizId == quiz.QuizId)
            };

            return Ok(quizResponseDto);
        }
        [HttpDelete("{quizId}")]
        public IActionResult DeleteQuiz(long quizId)
        {
            var quiz = _context.Quizzes.Include(q => q.Questions).FirstOrDefault(q => q.QuizId == quizId);
            if (quiz == null)
            {
                return NotFound($"Quiz with id: {quizId} doesn't exist");
            }

            // Remove related questions first
            _context.Questions.RemoveRange(quiz.Questions);

            // Remove the quiz
            _context.Quizzes.Remove(quiz);
            _context.SaveChanges();

            return NoContent();

        }

            [HttpGet]
        public IActionResult GetAllQuizzes()
        {
            var quizzes = _context.Quizzes
                .Include(q => q.Category)
                .Select(q => new QuizResponseDto
                {
                    QuizId = q.QuizId,
                    Title = q.Title,
                    Description = q.Description,
                    Category = new CategoryDto
                    {
                        CatId = q.Category.CatId,
                        Title = q.Category.Title,
                        Description = q.Category.Description
                    },
                    NumberOfQuestions = _context.Questions.Count(question => question.QuizId == q.QuizId)
                }).ToList();

            return Ok(quizzes);
        }
        [HttpGet("category/{cid}")]
        public async Task<ActionResult<IEnumerable<Quiz>>> GetQuizzesByCategory(long cid)
        {
            var quizzes = await _context.Quizzes
                .Where(q => q.CategoryId == cid)
                .ToListAsync();

            if (quizzes == null || quizzes.Count == 0)
            {
                return NotFound(new { message = "No quizzes found for this category." });
            }

            return Ok(quizzes);
        }


    }
}
