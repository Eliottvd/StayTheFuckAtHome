using Microsoft.EntityFrameworkCore.Migrations;

namespace WalkingDead.Migrations
{
    public partial class Uniformisation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IdUser",
                table: "Tests");

            migrationBuilder.DropColumn(
                name: "IdUser",
                table: "Movements");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "IdUser",
                table: "Tests",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "IdUser",
                table: "Movements",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
