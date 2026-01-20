# What Café - Backend Setup Guide

## 📋 Prerequisites
- Node.js (v14+)
- npm หรือ yarn
- MongoDB Atlas account (ที่คุณมีแล้ว)

## 🚀 Installation Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
ไฟล์ `.env` เตรียมไว้แล้วที่:
```
backend/.env
```

Verify ว่ามี:
```
MONGODB_URI=mongodb+srv://mix123arkxc_db_user:E817rY8dRtf6mL7x@cluster0.cngi6am.mongodb.net/?appName=Cluster0
PORT=5000
JWT_SECRET=your_super_secret_key_here_change_this
NODE_ENV=development
```

### 3. Run Backend Server
```bash
npm run dev
```
Server จะเริ่มที่ `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- **POST** `/api/auth/register` - สมัครสมาชิก
- **POST** `/api/auth/login` - เข้าสู่ระบบ
- **GET** `/api/auth/me` - ดูข้อมูลผู้ใช้ (ต้อง login)

### Bookings
- **GET** `/api/bookings` - ดูการจองของฉัน
- **POST** `/api/bookings` - สร้างการจอง
- **DELETE** `/api/bookings/:id` - ยกเลิกการจอง

### Seats
- **GET** `/api/seats` - ดูที่นั่งทั้งหมด
- **POST** `/api/seats/init` - สร้างที่นั่งเริ่มต้น (รันครั้งเดียว)

### Menu
- **GET** `/api/menu` - ดูเมนู
- **POST** `/api/menu` - เพิ่มรายการเมนู

## 📱 Frontend Integration

### 1. Import API Module
```html
<script src="api.js"></script>
```

### 2. Register Example
```javascript
try {
  const result = await registerUser('John Doe', 'john@example.com', '0812345678', 'johndoe', 'password123', 'password123');
  console.log('User registered:', result.user);
} catch (error) {
  console.error('Registration error:', error);
}
```

### 3. Login Example
```javascript
try {
  const result = await loginUser('johndoe', 'password123');
  console.log('Logged in:', result.user);
} catch (error) {
  console.error('Login error:', error);
}
```

### 4. Create Booking Example
```javascript
try {
  const booking = await createBooking('A1', '09:00', '11:00', new Date().toISOString());
  console.log('Booking created:', booking);
} catch (error) {
  console.error('Booking error:', error);
}
```

## 🔧 Project Structure
```
backend/
├── models/           # MongoDB schemas
│   ├── User.js
│   ├── Booking.js
│   ├── MenuItem.js
│   └── Seat.js
├── routes/           # API endpoints
│   ├── auth.js
│   ├── bookings.js
│   ├── seats.js
│   └── menu.js
├── middleware/       # Authentication middleware
│   └── auth.js
├── server.js         # Main server file
├── package.json      # Dependencies
└── .env              # Environment variables
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- ตรวจสอบ MONGODB_URI ถูกต้อง
- ตรวจสอบ IP Whitelist ใน MongoDB Atlas

### CORS Error
- Backend ส่วนประกอบแล้ว CORS middleware
- ถ้าเรียกจาก domain อื่น แก้ไข CORS policy ใน `server.js`

### Token Error
- เข้าสู่ระบบใหม่ เพื่อรับ token
- ตรวจสอบ token ยัง valid

## 📝 Notes
- Connection string: MongoDB Atlas ของคุณ
- Security: เปลี่ยน `JWT_SECRET` เป็นค่าอื่นในการ production
- Passwords: Hash อัตโนมัติด้วย bcryptjs

Happy Coding! ☕
