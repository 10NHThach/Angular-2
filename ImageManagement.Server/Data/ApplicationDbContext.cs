using Microsoft.EntityFrameworkCore;
using ImageManagement.Server.Models;

namespace ImageManagement.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<DanhMuc> DanhMucs { get; set; }
        public DbSet<HinhAnh> HinhAnhs { get; set; }
    }
}
