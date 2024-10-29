const express = require('express');
const router = express.Router();
const { register, login, updateUser, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

// Register ผู้ใช้
router.post('/register', register);

// Login ผู้ใช้
router.post('/login', login);

// แก้ไขข้อมูลผู้ใช้ (ต้องการสิทธิ์ user หรือ admin)
router.put('/update', auth(), updateUser);

// ลบผู้ใช้ (ต้องการสิทธิ์ admin)
router.delete('/delete', auth('admin'), deleteUser);

module.exports = router;
