export interface User {
  id?: number; // ID của người dùng, có thể không cần khi đăng ký
  username: string; // Tên người dùng
  password: string; // Mật khẩu
  email?: string; // Email (bắt buộc khi đăng ký)
  role?: string; // Vai trò của người dùng (Admin/User)
}
