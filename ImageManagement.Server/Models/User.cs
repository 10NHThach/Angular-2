using System.ComponentModel.DataAnnotations;

namespace ImageManagement.Server.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Username { get; set; }

        [Required]
        [StringLength(255)]
        public string Password { get; set; } // Lưu mật khẩu đã được hash

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(50)]
        public string Role { get; set; } = "User"; // Mặc định vai trò là "User"
    }
}
