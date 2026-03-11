# Quick Start Guide

## ⚠️ Prerequisites Installation Required

Your system is missing some required software. Please install:

### 1. Install Node.js (for React frontend)
```bash
brew install node
```

### 2. Install MySQL (for database)
```bash
brew install mysql
brew services start mysql
```

### 3. Setup MySQL Database
```bash
# Login to MySQL
mysql -u root

# Create database
CREATE DATABASE foodapp;
exit;
```

---

## 🚀 Running the Application

### Backend (Spring Boot) - Port 8080

1. Navigate to backend:
```bash
cd backend
```

2. Run with H2 in-memory database (no MySQL needed):
```bash
mvn clean spring-boot:run -Dspring-boot.run.profiles=h2
```

Backend will start at: **http://localhost:8080**

H2 Console: **http://localhost:8080/h2-console**
- JDBC URL: `jdbc:h2:mem:foodapp`
- Username: `sa`
- Password: (leave empty)

### Frontend (React) - Port 3000

1. Install Node.js first (see above)

2. Navigate to frontend:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Start development server:
```bash
npm start
```

Frontend will start at: **http://localhost:3000**

---

## 📝 Sample Data

After backend starts, you can add sample restaurants using the SQL script:
```bash
# The backend will create tables automatically
# Then you can insert sample data from:
backend/src/main/resources/sample-data.sql
```

---

## 🧪 Testing

1. Open browser: **http://localhost:3000**
2. Register a new account
3. Browse restaurants (add some using sample data first)
4. Add items to cart
5. Checkout with Stripe test card: `4242 4242 4242 4242`

---

## 🔧 Current Status

✅ Java 17 - Installed
✅ Maven - Installed  
❌ Node.js - **NOT INSTALLED** (required for frontend)
❌ MySQL - **NOT INSTALLED** (optional, can use H2)

---

## 💡 Next Steps

1. Install Node.js: `brew install node`
2. Start backend: `cd backend && mvn spring-boot:run -Dspring-boot.run.profiles=h2`
3. Start frontend: `cd frontend && npm install && npm start`
4. Open: **http://localhost:3000**

---

## 📞 Need Help?

Check the full documentation in:
- `README.md` - Complete project overview
- `SETUP.md` - Detailed setup instructions
- `API_DOCUMENTATION.md` - API endpoints reference
