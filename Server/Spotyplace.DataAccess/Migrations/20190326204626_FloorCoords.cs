using Microsoft.EntityFrameworkCore.Migrations;

namespace Spotyplace.DataAccess.Migrations
{
    public partial class FloorCoords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MapHeight",
                table: "Floors",
                maxLength: 5,
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MapWidth",
                table: "Floors",
                maxLength: 5,
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MapHeight",
                table: "Floors");

            migrationBuilder.DropColumn(
                name: "MapWidth",
                table: "Floors");
        }
    }
}
