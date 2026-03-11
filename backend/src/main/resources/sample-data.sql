-- Sample data for testing the food ordering application
-- Run this after the application creates the tables

-- Insert sample restaurants
INSERT INTO restaurants (name, description, address, phone, image_url, rating, delivery_time, delivery_fee, is_open) VALUES
('Pizza Palace', 'Authentic Italian pizzas with fresh ingredients', '123 Main Street, Downtown', '555-0100', 'https://images.unsplash.com/photo-1513104890138-7c749659a591', 4.5, 30, 2.99, true),
('Burger House', 'Gourmet burgers and craft beers', '456 Oak Avenue, Midtown', '555-0200', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', 4.3, 25, 1.99, true),
('Sushi Express', 'Fresh sushi and Japanese cuisine', '789 Pine Road, Eastside', '555-0300', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351', 4.7, 35, 3.99, true),
('Taco Fiesta', 'Authentic Mexican street food', '321 Elm Street, Westside', '555-0400', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', 4.4, 20, 1.49, true),
('Pasta Paradise', 'Homemade pasta and Italian classics', '654 Maple Drive, Uptown', '555-0500', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', 4.6, 28, 2.49, true);

-- Insert menu items for Pizza Palace (restaurant_id = 1)
INSERT INTO menu_items (name, description, price, image_url, category, is_vegetarian, is_available, restaurant_id) VALUES
('Margherita Pizza', 'Classic tomato sauce, fresh mozzarella, and basil', 12.99, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', 'Pizza', true, true, 1),
('Pepperoni Pizza', 'Loaded with pepperoni and mozzarella cheese', 14.99, 'https://images.unsplash.com/photo-1628840042765-356cda07504e', 'Pizza', false, true, 1),
('Veggie Supreme', 'Bell peppers, onions, mushrooms, olives, and tomatoes', 13.99, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', 'Pizza', true, true, 1),
('BBQ Chicken Pizza', 'BBQ sauce, grilled chicken, red onions, and cilantro', 15.99, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', 'Pizza', false, true, 1),
('Caesar Salad', 'Fresh romaine lettuce with caesar dressing and croutons', 8.99, 'https://images.unsplash.com/photo-1546793665-c74683f339c1', 'Salad', true, true, 1),
('Garlic Bread', 'Toasted bread with garlic butter and herbs', 5.99, 'https://images.unsplash.com/photo-1573140401552-388e3ead0b5e', 'Sides', true, true, 1);

-- Insert menu items for Burger House (restaurant_id = 2)
INSERT INTO menu_items (name, description, price, image_url, category, is_vegetarian, is_available, restaurant_id) VALUES
('Classic Cheeseburger', 'Beef patty, cheddar cheese, lettuce, tomato, pickles', 11.99, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd', 'Burgers', false, true, 2),
('Bacon Deluxe', 'Double beef patty, bacon, cheese, special sauce', 14.99, 'https://images.unsplash.com/photo-1553979459-d2229ba7433b', 'Burgers', false, true, 2),
('Veggie Burger', 'Plant-based patty, avocado, lettuce, tomato', 10.99, 'https://images.unsplash.com/photo-1520072959219-c595dc870360', 'Burgers', true, true, 2),
('Chicken Sandwich', 'Crispy chicken breast, coleslaw, spicy mayo', 12.99, 'https://images.unsplash.com/photo-1606755962773-d324e0a13086', 'Sandwiches', false, true, 2),
('French Fries', 'Crispy golden fries with sea salt', 4.99, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877', 'Sides', true, true, 2),
('Onion Rings', 'Beer-battered onion rings with ranch dip', 5.99, 'https://images.unsplash.com/photo-1639024471283-03518883512d', 'Sides', true, true, 2);

-- Insert menu items for Sushi Express (restaurant_id = 3)
INSERT INTO menu_items (name, description, price, image_url, category, is_vegetarian, is_available, restaurant_id) VALUES
('California Roll', 'Crab, avocado, cucumber, sesame seeds', 9.99, 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351', 'Rolls', false, true, 3),
('Spicy Tuna Roll', 'Fresh tuna, spicy mayo, cucumber', 11.99, 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56', 'Rolls', false, true, 3),
('Vegetable Roll', 'Cucumber, avocado, carrot, bell pepper', 8.99, 'https://images.unsplash.com/photo-1553621042-f6e147245754', 'Rolls', true, true, 3),
('Salmon Nigiri', 'Fresh salmon over seasoned rice (6 pieces)', 13.99, 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93', 'Nigiri', false, true, 3),
('Miso Soup', 'Traditional Japanese soup with tofu and seaweed', 3.99, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84', 'Soup', true, true, 3),
('Edamame', 'Steamed soybeans with sea salt', 4.99, 'https://images.unsplash.com/photo-1583797227936-4253e0c3a0e1', 'Appetizers', true, true, 3);

-- Insert menu items for Taco Fiesta (restaurant_id = 4)
INSERT INTO menu_items (name, description, price, image_url, category, is_vegetarian, is_available, restaurant_id) VALUES
('Beef Tacos', 'Seasoned ground beef, lettuce, cheese, salsa (3 tacos)', 9.99, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47', 'Tacos', false, true, 4),
('Chicken Tacos', 'Grilled chicken, pico de gallo, sour cream (3 tacos)', 10.99, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b', 'Tacos', false, true, 4),
('Veggie Tacos', 'Black beans, corn, peppers, guacamole (3 tacos)', 8.99, 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f', 'Tacos', true, true, 4),
('Burrito Bowl', 'Rice, beans, meat, cheese, salsa, sour cream', 11.99, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f', 'Bowls', false, true, 4),
('Chips & Guacamole', 'Fresh tortilla chips with homemade guacamole', 6.99, 'https://images.unsplash.com/photo-1534939561126-855b8675edd7', 'Sides', true, true, 4),
('Quesadilla', 'Cheese quesadilla with sour cream and salsa', 7.99, 'https://images.unsplash.com/photo-1618040996337-56904b7850b9', 'Appetizers', true, true, 4);

-- Insert menu items for Pasta Paradise (restaurant_id = 5)
INSERT INTO menu_items (name, description, price, image_url, category, is_vegetarian, is_available, restaurant_id) VALUES
('Spaghetti Carbonara', 'Creamy sauce with bacon and parmesan', 13.99, 'https://images.unsplash.com/photo-1612874742237-6526221588e3', 'Pasta', false, true, 5),
('Fettuccine Alfredo', 'Rich cream sauce with butter and parmesan', 12.99, 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a', 'Pasta', true, true, 5),
('Penne Arrabbiata', 'Spicy tomato sauce with garlic and chili', 11.99, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9', 'Pasta', true, true, 5),
('Lasagna', 'Layers of pasta, meat sauce, and cheese', 14.99, 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3', 'Pasta', false, true, 5),
('Caprese Salad', 'Fresh mozzarella, tomatoes, basil, balsamic', 9.99, 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5', 'Salad', true, true, 5),
('Tiramisu', 'Classic Italian dessert with coffee and mascarpone', 6.99, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9', 'Dessert', true, true, 5);

-- Note: You'll need to create users through the registration endpoint
-- The application will handle password encryption
