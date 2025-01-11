using System.Collections.Generic;

namespace ImageManagement.Server.Models
{
    public class DanhMuc
    {
        public int Id { get; set; }
        public string Ten { get; set; }
        public string MoTa { get; set; }
        public ICollection<HinhAnh> HinhAnhs { get; set; } = new List<HinhAnh>();
    }
}
