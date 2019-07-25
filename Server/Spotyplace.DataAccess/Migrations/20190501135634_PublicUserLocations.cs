using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Spotyplace.DataAccess.Migrations
{
    public partial class PublicUserLocations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPublicToSelected",
                table: "Locations",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "PublicUserLocations",
                columns: table => new
                {
                    UserId = table.Column<Guid>(nullable: false),
                    LocationId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PublicUserLocations", x => new { x.UserId, x.LocationId });
                    table.ForeignKey(
                        name: "FK_PublicUserLocations_Locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "Locations",
                        principalColumn: "LocationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PublicUserLocations_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PublicUserLocations_LocationId",
                table: "PublicUserLocations",
                column: "LocationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PublicUserLocations");

            migrationBuilder.DropColumn(
                name: "IsPublicToSelected",
                table: "Locations");
        }
    }
}
