using Microsoft.EntityFrameworkCore.Migrations;

namespace Spotyplace.DataAccess.Migrations
{
    public partial class ChargeeUserInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ChargebeeId",
                table: "AspNetUsers",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ChargebeePlanId",
                table: "AspNetUsers",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ChargebeeSubscriptionStatus",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChargebeeId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ChargebeePlanId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "ChargebeeSubscriptionStatus",
                table: "AspNetUsers");
        }
    }
}
