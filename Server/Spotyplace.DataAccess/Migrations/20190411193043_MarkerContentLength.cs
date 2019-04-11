using Microsoft.EntityFrameworkCore.Migrations;

namespace Spotyplace.DataAccess.Migrations
{
    public partial class MarkerContentLength : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TooltipContent",
                table: "Markers",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "TooltipContent",
                table: "Markers",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 20);
        }
    }
}
