const PROXY_CONFIG = [
  {
    context: [
      "/api/DanhMuc", // Proxy toàn bộ các endpoint bắt đầu bằng /api
    ],
    target: "https://localhost:7156",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
