namespace ExamPortol.Models
{
    public class Role
    {
        public string RoleName { get; set; } = null!;

        public string? RoleDescription { get; set; }

        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }
}
