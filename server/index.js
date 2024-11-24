const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware để parse JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:8081', // Thay đổi nếu cần
}));

// Cấu hình kết nối đến MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'healthycheck',
});

db.connect(err => {
  if (err) {
    console.error('Kết nối đến MySQL thất bại:', err);
  } else {
    console.log('Kết nối đến MySQL thành công');
  }
});

// API đăng ký tài khoản
app.post('/api/register', (req, res) => {
  const { email, password, name, avatar } = req.body;

  if (!email || !password || !name || !avatar) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập email, mật khẩu, tên và hình đại diện' });
  }

  // Kiểm tra nếu email đã tồn tại
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi khi kiểm tra email' });
    }

    if (results.length > 0) {
      return res.status(409).json({ success: false, message: 'Email đã tồn tại' });
    }

    // Lưu tài khoản mới vào cơ sở dữ liệu
    db.query('INSERT INTO users (email, password, name, avatar) VALUES (?, ?, ?, ?)', [email, password, name, avatar], (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Lỗi khi tạo tài khoản' });
      }
      return res.status(201).json({ success: true, message: 'Tài khoản đã được tạo thành công' });
    });
  });
});

// API đăng nhập
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length > 0) {
      const user = results[0];

      // Kiểm tra mật khẩu
      if (password === user.password) {
        return res.json({
          id: user.id, // Trả về id
          email: user.email,
          avatar: user.avatar,
          name: user.name,
        });
      } else {
        return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
      }
    } else {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
  });
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }

  // Ngăn chặn xóa người dùng có id = 1
  if (userId === 1) {
    return res.status(403).json({ error: "Không thể xóa người dùng mặc định" });
  }

  // Xóa người dùng từ database
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi xóa người dùng" });
    }

    if (results.affectedRows > 0) {
      return res.status(200).json({ message: "Xóa người dùng thành công" });
    } else {
      return res.status(404).json({ error: "Không tìm thấy người dùng" });
    }
  });
});
// API phía server sử dụng Express.js
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, avatar } = req.body;

  if (isNaN(userId)) {
    return res.status(400).json({ error: "ID không hợp lệ" });
  }

  // Cập nhật thông tin người dùng trong cơ sở dữ liệu
  db.query(
    'UPDATE users SET name = ?, avatar = ? WHERE id = ?',
    [name, avatar, userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi cập nhật thông tin người dùng" });
      }

      if (results.affectedRows > 0) {
        // Trả về thông tin người dùng đã được cập nhật
        return res.status(200).json({ message: "Cập nhật thông tin người dùng thành công" });
      } else {
        return res.status(404).json({ error: "Không tìm thấy người dùng với ID này" });
      }
    }
  );
});






// API quên mật khẩu
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập email' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi khi kiểm tra email' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Email không tồn tại' });
    }

    // Nếu email tồn tại
    return res.status(200).json({ success: true });
  });
});

// API đặt lại mật khẩu
app.post('/api/reset-password', (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu mới' });
  }

  db.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi khi cập nhật mật khẩu' });
    }

    if (results.affectedRows > 0) {
      return res.status(200).json({ success: true, message: 'Mật khẩu đã được cập nhật thành công' });
    } else {
      return res.status(404).json({ success: false, message: 'Email không tồn tại' });
    }
  });
});

// API lấy dữ liệu tất cả người dùng từ MySQL
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send('Lỗi khi lấy dữ liệu từ database');
    } else {
      res.json(results);
    }
  });
});

// API lấy dữ liệu highlight
app.get('/api/health-data', (req, res) => {
  db.query('SELECT * FROM health_data', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Lỗi khi lấy dữ liệu health_data' });
    }
    return res.json({ success: true, data: results });
  });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server chạy trên http://localhost:${PORT}`);
});
