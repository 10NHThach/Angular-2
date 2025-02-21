using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImageManagement.Server.Data;
using ImageManagement.Server.Models;

namespace ImageManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HinhAnhController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HinhAnhController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Lấy tất cả hình ảnh, sắp xếp theo ngày đăng giảm dần
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var images = await _context.HinhAnhs
                .Include(h => h.DanhMuc) // Bao gồm thông tin danh mục
                .OrderByDescending(h => h.NgayDang) // Sắp xếp theo ngày đăng mới nhất
                .ToListAsync();

            return Ok(images);
        }

        // Lấy chi tiết hình ảnh theo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var hinhAnh = await _context.HinhAnhs
                .Include(h => h.DanhMuc) // Bao gồm thông tin danh mục
                .FirstOrDefaultAsync(h => h.Id == id);

            if (hinhAnh == null) return NotFound();
            return Ok(hinhAnh);
        }

        // Thêm mới hình ảnh
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] HinhAnh hinhAnh)
        {
            hinhAnh.NgayDang = DateTime.Now; // Ghi lại ngày hiện tại
            _context.HinhAnhs.Add(hinhAnh);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = hinhAnh.Id }, hinhAnh);
        }

        // Cập nhật thông tin hình ảnh
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] HinhAnh hinhAnh)
        {
            if (id != hinhAnh.Id) return BadRequest();

            // Cập nhật thông tin hình ảnh
            hinhAnh.NgayDang = DateTime.Now; // Ghi lại ngày cập nhật
            _context.Entry(hinhAnh).State = EntityState.Modified;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Xóa hình ảnh
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var hinhAnh = await _context.HinhAnhs.FindAsync(id);
            if (hinhAnh == null) return NotFound();

            _context.HinhAnhs.Remove(hinhAnh);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("favorites")]
        public IActionResult GetFavoriteImages()
        {
            var favoriteImages = _context.HinhAnhs.Where(img => img.IsFavorite).ToList();
            return Ok(favoriteImages);
        }

        [HttpPut("toggle-favorite/{id}")]
        public IActionResult ToggleFavorite(int id)
        {
            var image = _context.HinhAnhs.Find(id);
            if (image == null)
            {
                return NotFound();
            }

            image.IsFavorite = !image.IsFavorite; // Đảo trạng thái yêu thích
            _context.SaveChanges();

            return Ok(image);
        }

    }
}
