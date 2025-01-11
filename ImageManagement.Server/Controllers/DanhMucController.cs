using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImageManagement.Server.Data;
using ImageManagement.Server.Models;

namespace ImageManagement.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DanhMucController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Lấy tất cả danh mục, bao gồm cả hình ảnh
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var danhMucs = await _context.DanhMucs
                .Include(d => d.HinhAnhs) // Bao gồm hình ảnh
                .ToListAsync();

            return Ok(danhMucs);
        }

        // Lấy danh mục theo id, bao gồm cả hình ảnh
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var danhMuc = await _context.DanhMucs
                .Include(d => d.HinhAnhs) // Bao gồm hình ảnh
                .FirstOrDefaultAsync(d => d.Id == id);

            if (danhMuc == null) return NotFound();
            return Ok(danhMuc);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] DanhMuc danhMuc)
        {
            if (danhMuc == null || string.IsNullOrWhiteSpace(danhMuc.Ten) || string.IsNullOrWhiteSpace(danhMuc.MoTa))
            {
                return BadRequest("Dữ liệu không hợp lệ");
            }
            _context.DanhMucs.Add(danhMuc);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = danhMuc.Id }, danhMuc);
        }

        // Cập nhật thông tin danh mục
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] DanhMuc danhMuc)
        {
            if (id != danhMuc.Id) return BadRequest();

            // Kiểm tra dữ liệu đầu vào
            if (danhMuc == null)
            {
                return BadRequest("Danh mục không hợp lệ.");
            }

            _context.Entry(danhMuc).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Xóa danh mục
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var danhMuc = await _context.DanhMucs.FindAsync(id);
            if (danhMuc == null) return NotFound();

            _context.DanhMucs.Remove(danhMuc);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}
