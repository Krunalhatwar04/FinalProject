using ExamPortol.Data;
using ExamPortol.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace ExamPortol.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

        public UsersController(DataContext context, IPasswordHasher<User> passwordHasher, IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                // Create user with hashed password
                var user = new User
                {
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    Email = model.Email,
                    UserName = model.Username,
                    PasswordHash = _passwordHasher.HashPassword(null, model.Password),
                    PhoneNumber = model.PhoneNumber,
                    Role = "USERS"
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "User registered successfully" });
            }

            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var user = await _context.Users
                                      .FirstOrDefaultAsync(u => u.UserName == loginModel.Username);

            if (user == null || !_passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginModel.Password).Equals(PasswordVerificationResult.Success))
            {
                return Unauthorized("Invalid credentials");
            }

            var token = GenerateJwtToken(user);
            var response = new
            {
                id = user.UserId,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                userName = user.UserName,
                phoneNumber = user.PhoneNumber,
                role = user.Role, // Single role as a string
                roles = new List<string> { user.Role } // Role in a list if needed
            };

            return Ok(new { user = response, jwtToken = token });
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
            };

            if (!string.IsNullOrEmpty(user.Role))
            {
                claims.Add(new Claim(ClaimTypes.Role, user.Role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        [Authorize]
        [HttpGet("current-user")]
        public async Task<IActionResult> GetCurrentUser()
        {
            // Get the user ID from the JWT token claims
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Retrieve the user from the database
            var user = await _context.Users.FindAsync(int.Parse(userId));

            if (user == null)
            {
                return NotFound("User not found");
            }

            // Create a response object with user details
            var response = new
            {
                id = user.UserId,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                userName = user.UserName,
                phoneNumber = user.PhoneNumber,
                role = user.Role,
                roles = new List<string> { user.Role }
            };

            return Ok(response);
        }
        [HttpGet("all-users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users
                .Select(u => new UserResponseDto
                {
                    UserId = u.UserId,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    UserName = u.UserName,
                    PhoneNumber = u.PhoneNumber,
                    Role = u.Role
                }).ToListAsync();

            return Ok(users);

                
        }

        [HttpGet("quizzes/count")]
        public async Task<IActionResult> GetQuizCount()
        {
            var count = await Task.FromResult(_context.Quizzes.Count());
            return Ok(count);
        }

        [HttpGet("users/count")]
        public async Task<IActionResult> GetUserCount()
        {
            var count = await Task.FromResult(_context.Users.Count());
            return Ok(count);
        }

        [HttpGet("admins/count")]
        public async Task<IActionResult> GetAdminCount()
        {
            var count = await Task.FromResult(_context.Users.Count(u => u.Role == "Admin")); // Assuming you have a Role field
            return Ok(count);
        }

        [HttpGet("categories/count")]
        public async Task<IActionResult> GetCategoryCount()
        {
            var count = await Task.FromResult(_context.Categories.Count());
            return Ok(count);
        }

    }
}
