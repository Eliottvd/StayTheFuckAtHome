using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WalkingDead.Migrations
{
    public partial class initialmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    RegistreNational = table.Column<string>(nullable: false),
                    CodePostal = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.RegistreNational);
                });

            migrationBuilder.CreateTable(
                name: "Movements",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdUser = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    Longitude = table.Column<double>(nullable: false),
                    Latitude = table.Column<double>(nullable: false),
                    UserRegistreNational = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Movements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Movements_Users_UserRegistreNational",
                        column: x => x.UserRegistreNational,
                        principalTable: "Users",
                        principalColumn: "RegistreNational",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tests",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Result = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false),
                    IdUser = table.Column<string>(nullable: true),
                    UserRegistreNational = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tests_Users_UserRegistreNational",
                        column: x => x.UserRegistreNational,
                        principalTable: "Users",
                        principalColumn: "RegistreNational",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Movements_UserRegistreNational",
                table: "Movements",
                column: "UserRegistreNational");

            migrationBuilder.CreateIndex(
                name: "IX_Tests_UserRegistreNational",
                table: "Tests",
                column: "UserRegistreNational");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Movements");

            migrationBuilder.DropTable(
                name: "Tests");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
