# Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Java 17 or higher
- Maven 3.8+
- Node.js 18+ and npm
- MySQL 8+ or PostgreSQL 14+
- Git

## Database Setup

1. Install MySQL and create a database:
```sql
CREATE DATABASE foodapp;
CREATE USER 'foodapp_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON foodapp.* TO 'foodapp_user'@'localhost';
FLUSH PRIVILEGES;
```

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Update `src/main/resources/application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/foodapp
spring.datasource.username=foodapp_user
spring.datasource.password=your_password
```

3. Configure Stripe API key (get from https://stripe.com):
```properties
stripe.api.key=sk_test_your_stripe_secret_key
```

4. Configure email settings (optional, for Gmail):
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

5. Build and run the backend:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_STRIPE_KEY=pk_test_your_stripe_publishable_key
```

4. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## Testing the Application

1. Open your browser and navigate to `http://localhost:3000`
2. Register a new account
3. Browse restaurants (you'll need to add some via database or API)
4. Add items to cart
5. Proceed to checkout
6. Complete payment using Stripe test card: `4242 4242 4242 4242`

## Adding Sample Data

You can add sample restaurants and menu items using the following SQL:

```sql
-- Insert sample restaurant
INSERT INTO restaurants (name, description, address, phone, rating, delivery_time, delivery_fee, is_open)
VALUES ('Pizza Palace', 'Best pizza in town', '123 Main St', '555-0100', 4.5, 30, 2.99, true);

-- Insert sample menu items (replace restaurant_id with actual ID)
INSERT INTO menu_items (name, description, price, category, is_vegetarian, is_available, restaurant_id)
VALUES 
('Margherita Pizza', 'Classic tomato and mozzarella', 12.99, 'Pizza', true, true, 1),
('Pepperoni Pizza', 'Loaded with pepperoni', 14.99, 'Pizza', false, true, 1),
('Caesar Salad', 'Fresh romaine with caesar dressing', 8.99, 'Salad', true, true, 1);
```

## Troubleshooting

### Backend Issues
- Ensure MySQL is running: `sudo systemctl status mysql`
- Check logs: Look at console output for errors
- Verify Java version: `java -version`

### Frontend Issues
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check console for errors in browser DevTools

### Database Connection Issues
- Verify MySQL is running
- Check credentials in application.properties
- Ensure database exists: `SHOW DATABASES;`

## Production Deployment

### Backend
1. Update application.properties for production
2. Build JAR: `mvn clean package`
3. Run: `java -jar target/food-ordering-backend-1.0.0.jar`

### Frontend
1. Build production bundle: `npm run build`
2. Serve using nginx or deploy to Vercel/Netlify

## Environment Variables

### Backend (application.properties)
- `spring.datasource.url` - Database URL
- `spring.datasource.username` - Database username
- `spring.datasource.password` - Database password
- `jwt.secret` - JWT secret key (min 256 bits)
- `stripe.api.key` - Stripe secret key
- `spring.mail.username` - Email username
- `spring.mail.password` - Email password

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_STRIPE_KEY` - Stripe publishable key

## Support

For issues or questions, please open an issue in the repository.
