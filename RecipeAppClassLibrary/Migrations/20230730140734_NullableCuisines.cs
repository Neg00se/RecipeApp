using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RecipeAppData.Migrations
{
    /// <inheritdoc />
    public partial class NullableCuisines : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Cuisines_CuisineId",
                table: "Recipes");

            migrationBuilder.AlterColumn<int>(
                name: "CuisineId",
                table: "Recipes",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Cuisines_CuisineId",
                table: "Recipes",
                column: "CuisineId",
                principalTable: "Cuisines",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Cuisines_CuisineId",
                table: "Recipes");

            migrationBuilder.AlterColumn<int>(
                name: "CuisineId",
                table: "Recipes",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Cuisines_CuisineId",
                table: "Recipes",
                column: "CuisineId",
                principalTable: "Cuisines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
