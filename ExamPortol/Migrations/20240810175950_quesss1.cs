using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExamPortol.Migrations
{
    /// <inheritdoc />
    public partial class quesss1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Question1",
                table: "Questions",
                newName: "Questions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Questions",
                table: "Questions",
                newName: "Question1");
        }
    }
}
