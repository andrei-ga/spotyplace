using Microsoft.EntityFrameworkCore.Migrations;

namespace Spotyplace.DataAccess.Migrations
{
    public partial class MarkerRadius : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Radius",
                table: "Markers",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.Sql("CREATE EXTENSION pg_trgm;");
            migrationBuilder.Sql("CREATE INDEX TRGM_IDX_Locations_Name ON \"Locations\" USING gin (\"Name\" gin_trgm_ops);");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Radius",
                table: "Markers");

            migrationBuilder.Sql("DROP INDEX TRGM_IDX_Locations_Name;");
            migrationBuilder.Sql("DROP EXTENSION pg_trgm;");
        }
    }
}
