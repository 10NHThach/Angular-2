using ImageManagement.Server.Models;
using System.Text.Json.Serialization;

public class HinhAnh
{
    public int Id { get; set; }
    public string Ten { get; set; }
    public string MoTa { get; set; }
    public int DanhMucId { get; set; }

    // Bỏ yêu cầu bắt buộc nếu cần
    [JsonIgnore]
    public DanhMuc? DanhMuc { get; set; }
    public string ImageUrl { get; set; } // Đừng quên URL hình ảnh
    public DateTime NgayDang { get; set; } = DateTime.Now; // Ngày đăng tải
}
