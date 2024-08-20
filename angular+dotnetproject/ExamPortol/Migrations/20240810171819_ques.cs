using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExamPortol.Migrations
{
    /// <inheritdoc />
    public partial class ques : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Quizzes");

            migrationBuilder.DropColumn(
                name: "QuizQuizId",
                table: "Questions");

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Questions",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Quizzes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AlterColumn<string>(
                name: "Image",
                table: "Questions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "QuizQuizId",
                table: "Questions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
