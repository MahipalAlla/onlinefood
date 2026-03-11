# 🍕 Online Food Ordering Application

A full-stack food ordering platform built with React.js and Spring Boot, featuring real-world capabilities including payment gateway integration, responsive design, and modern UI/UX.

## 🚀 Features

### Frontend (React.js)
- 🎨 Beautiful, responsive UI with modern design
- 🔐 User authentication & authorization
- 🍔 Browse restaurants and menu items
- 🛒 Shopping cart with real-time updates
- 💳 Payment gateway integration (Stripe/Razorpay)
- � Mobile-first responsive design
- 🎭 Smooth animations and transitions
- � Search and filter functionality
- ⭐ Restaurant ratings and reviews
- � Location-based restaurant discovery

### Backend (Spring Boot with Java 17)
- ☕ Java 17 features (Records, Pattern Matching, Text Blocks)
- 🔒 JWT-based authentication
- 🗄️ RESTful API architecture
- 💾 JPA/Hibernate with MySQL/PostgreSQL
- 💰 Payment processing integration
- 📧 Email notifications
- 🔄 Order management system
- 👥 Role-based access control (Customer, Restaurant, Admin)
- 📊 Order tracking and history
- 🛡️ Security best practices

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Java 17+
- Maven 3.8+
- MySQL 8+ or PostgreSQL 14+
- Git

## 🏗️ Project Structure

```
online-food-app/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── utils/
│   │   └── assets/
│   └── package.json
│
└── backend/           # Spring Boot application
    ├── src/
    │   ├── main/
    │   │   ├── java/
    │   │   └── resources/
    │   └── test/
    └── pom.xml
```

## 🔧 Installation & Setup

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Configure database in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/foodapp
spring.datasource.username=your_username
spring.datasource.password=your_password
```

3. Configure payment gateway credentials in `application.properties`

4. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_STRIPE_KEY=your_stripe_publishable_key
```

4. Start development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/{id}` - Get restaurant details
- `GET /api/restaurants/{id}/menu` - Get restaurant menu

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order details
- `GET /api/orders/user/{userId}` - Get user orders
- `PUT /api/orders/{id}/status` - Update order status

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment

## 🔐 Environment Variables

### Backend
```properties
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your_email
SMTP_PASSWORD=your_password
```

### Frontend
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_STRIPE_KEY=your_stripe_publishable_key
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Deployment

### Backend (Docker)
```bash
cd backend
docker build -t food-app-backend .
docker run -p 8080:8080 food-app-backend
```

### Frontend (Build)
```bash
cd frontend
npm run build
```

## 🛠️ Technologies Used

### Frontend
- React 18
- React Router v6
- Axios
- Context API / Redux
- Tailwind CSS / Material-UI
- Stripe/Razorpay SDK
- React Icons
- Framer Motion

### Backend
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- MySQL/PostgreSQL
- JWT Authentication
- Stripe/Razorpay API
- JavaMail
- Lombok
- MapStruct

## 👥 User Roles

1. **Customer**: Browse, order, track orders
2. **Restaurant Owner**: Manage menu, view orders
3. **Admin**: Manage users, restaurants, system settings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📧 Contact

For questions or support, please open an issue in the repository.

---

Built with ❤️ using React and Spring Boot
