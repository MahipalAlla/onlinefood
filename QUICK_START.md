# Quick Start Guide

## Your Food Ordering Application is Ready! 🎉

### Access Your Application
- **Frontend & Backend**: http://localhost:8080
- **H2 Database Console**: http://localhost:8080/h2-console

### What's Included

#### 🍕 6 Restaurants Pre-loaded:
1. **Biryani House** - Authentic Hyderabadi & Lucknowi Biryani
2. **Pizza Palace** - Authentic Italian pizzas with fresh ingredients
3. **Royal Biryani Paradise** - Premium biryani varieties
4. **Pizzeria Italiano** - New York style & Neapolitan pizzas
5. **Biryani Express** - Quick & delicious biryani delivery
6. **Pizza Corner** - Loaded pizzas with unlimited toppings

#### 📋 36 Menu Items Total:
- **Biryani varieties**: Hyderabadi, Lucknowi, Mutton, Chicken, Veg, Prawns, Fish, Paneer, Keema, Mushroom, Chicken Tikka
- **Pizza varieties**: Margherita, Pepperoni, BBQ Chicken, Hawaiian, Truffle, Meat Lovers, Cheese Burst, Paneer Tikka, Mexican Fiesta, Seafood Supreme
- **Sides & Extras**: Raita, Garlic Bread, Mirchi Ka Salan

### Features

✅ **Homepage with:**
- Auto-rotating slider with 3 promotional slides
- Today's Special Offers section (4 deals)
- Featured Restaurants showcase
- Why Choose Us section

✅ **User Features:**
- Register & Login with JWT authentication
- Browse restaurants and menus
- Add items to cart
- Place orders
- View order history

✅ **Beautiful UI:**
- Animated logo with bouncing pizza icon
- Gradient text effects
- Responsive design
- Modern card layouts

### How to Use

1. **Browse Restaurants**: Click on any restaurant card to view their menu
2. **Add to Cart**: Click "Add to Cart" on menu items you like
3. **Register/Login**: Create an account to place orders
4. **Checkout**: Review your cart and place your order
5. **Track Orders**: View your order history in "My Orders"

### Database Access

To view the database directly:
1. Go to http://localhost:8080/h2-console
2. Use these credentials:
   - **JDBC URL**: `jdbc:h2:mem:foodapp`
   - **Username**: `sa`
   - **Password**: (leave empty)
3. Click "Connect"

### Sample Data

All restaurant and menu data is automatically loaded from:
`backend/src/main/resources/sample-data.sql`

The database resets on each restart (in-memory H2 database).

### Stopping the Application

To stop the backend server:
```bash
lsof -ti:8080 | xargs kill -9
```

### Restarting the Application

```bash
cd backend
./start.sh
```

Or manually:
```bash
cd backend
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
mvn spring-boot:run
```

### Tech Stack

- **Backend**: Spring Boot 3.2.0 with Java 17
- **Database**: H2 In-Memory Database
- **Security**: JWT Authentication
- **Frontend**: Vanilla HTML/CSS/JavaScript (no build tools needed)
- **Server**: Embedded Tomcat on port 8080

### Promotional Codes Available

- `FIRST50` - 50% OFF on first order
- `PIZZA30` - 30% off on all pizzas
- `BURGER2X` - Buy 1 Get 1 Free on burgers
- `SUSHI25` - 25% discount on sushi rolls
- `SWEET40` - Free dessert on orders above $40

Enjoy your food ordering application! 🍕🍔🍣
