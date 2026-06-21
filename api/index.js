const express = require('express');
const app = express();

// Route mặc định
app.get('/', (req, res) => {
    res.send('Chào mừng bạn đến với ứng dụng Node.js trên Vercel! 🚀');
});

// Thêm một route ví dụ khác
app.get('/api/user', (req, res) => {
    res.json({
        id: 1,
        name: "Vercel User",
        status: "Active"
    });
});

// Xuất app ra để Vercel xử lý (Không dùng app.listen())
module.exports = app;
