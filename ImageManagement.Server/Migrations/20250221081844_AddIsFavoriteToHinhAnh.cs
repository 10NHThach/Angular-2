using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ImageManagement.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddIsFavoriteToHinhAnh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsFavorite",
                table: "HinhAnhs",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsFavorite",
                table: "HinhAnhs");
        }
    }
}
