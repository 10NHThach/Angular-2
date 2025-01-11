using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ImageManagement.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddImageUrlToHinhAnh : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "HinhAnhs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "HinhAnhs");
        }
    }
}
