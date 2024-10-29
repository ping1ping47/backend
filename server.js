const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();

const rateLimit = require('express-rate-limit');

// Rate limiter
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 นาที
    max: 100, // จำกัดที่ 100 requests ต่อ IP
  });

// เชื่อมต่อกับฐานข้อมูล
connectDB();

// Middleware
app.use(helmet()); // เพิ่มความปลอดภัย HTTP headers
app.use(cors()); // เปิดใช้ CORS
app.use(express.json()); // รับ JSON body
app.use(limiter);

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// เริ่มต้นเซิร์ฟเวอร์
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
