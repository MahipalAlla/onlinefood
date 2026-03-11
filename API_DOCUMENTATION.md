# API Documentation

Base URL: `http://localhost:8080/api`

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe",
  "phone": "555-0100",
  "address": "123 Main St"
}

Response: 200 OK
{
  "token": "jwt_token_here",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "CUSTOMER"
}
```

### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "token": "jwt_token_here",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "CUSTOMER"
}
```

## Restaurants

### Get All Restaurants
```http
GET /api/restaurants

Response: 200 OK
[
  {
    "id": 1,
    "name": "Pizza Palace",
    "description": "Best pizza in town",
    "address": "123 Main St",
    "phone": "555-0100",
    "imageUrl": "https://example.com/image.jpg",
    "rating": 4.5,
    "deliveryTime": 30,
    "deliveryFee": 2.99,
    "isOpen": true
  }
]
```

### Get Restaurant by ID
```http
GET /api/restaurants/{id}

Response: 200 OK
{
  "id": 1,
  "name": "Pizza Palace",
  ...
}
```

### Get Restaurant Menu
```http
GET /api/restaurants/{id}/menu

Response: 200 OK
[
  {
    "id": 1,
    "name": "Margherita Pizza",
    "description": "Classic tomato and mozzarella",
    "price": 12.99,
    "imageUrl": "https://example.com/pizza.jpg",
    "category": "Pizza",
    "isVegetarian": true,
    "isAvailable": true
  }
]
```

### Search Restaurants
```http
GET /api/restaurants/search?query=pizza

Response: 200 OK
[...]
```

## Orders (Authenticated)

### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "restaurantId": 1,
  "items": [
    {
      "menuItemId": 1,
      "quantity": 2
    },
    {
      "menuItemId": 2,
      "quantity": 1
    }
  ],
  "deliveryAddress": "123 Main St, Apt 4B",
  "specialInstructions": "Ring doorbell"
}

Response: 200 OK
{
  "id": 1,
  "user": {...},
  "restaurant": {...},
  "orderItems": [...],
  "totalAmount": 40.97,
  "deliveryFee": 2.99,
  "status": "PENDING",
  "paymentStatus": "PENDING",
  "deliveryAddress": "123 Main St, Apt 4B",
  "createdAt": "2024-01-15T10:30:00"
}
```

### Get User Orders
```http
GET /api/orders
Authorization: Bearer <token>

Response: 200 OK
[
  {
    "id": 1,
    "restaurant": {...},
    "orderItems": [...],
    "totalAmount": 40.97,
    "status": "DELIVERED",
    "paymentStatus": "COMPLETED",
    "createdAt": "2024-01-15T10:30:00"
  }
]
```

### Get Order by ID
```http
GET /api/orders/{id}
Authorization: Bearer <token>

Response: 200 OK
{...}
```

### Update Order Status (Admin/Restaurant)
```http
PUT /api/orders/{id}/status?status=CONFIRMED
Authorization: Bearer <token>

Response: 200 OK
{...}
```

## Payments (Authenticated)

### Create Payment Intent
```http
POST /api/payments/create-intent
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": 1,
  "amount": 40.97,
  "paymentMethodId": "pm_card_visa"
}

Response: 200 OK
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

### Confirm Payment
```http
POST /api/payments/confirm?orderId=1&paymentId=pi_xxx
Authorization: Bearer <token>

Response: 200 OK
{
  "message": "Payment confirmed successfully"
}
```

## Order Status Values

- `PENDING` - Order placed, awaiting confirmation
- `CONFIRMED` - Restaurant confirmed the order
- `PREPARING` - Food is being prepared
- `OUT_FOR_DELIVERY` - Order is on the way
- `DELIVERED` - Order delivered successfully
- `CANCELLED` - Order was cancelled

## Payment Status Values

- `PENDING` - Payment not yet processed
- `COMPLETED` - Payment successful
- `FAILED` - Payment failed
- `REFUNDED` - Payment was refunded

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## Rate Limiting

Currently no rate limiting is implemented. Consider adding rate limiting in production.

## Testing with Stripe

Use these test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any postal code.
