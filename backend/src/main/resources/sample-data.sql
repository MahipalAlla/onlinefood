-- Sample data for testing the food ordering application
-- Run this after the application creates the tables

-- Insert sample restaurants
INSERT INTO restaurants (name, description, address, phone, image_url, rating, delivery_time, delivery_fee, is_open) VALUES
('Biryani House', 'Authentic Hyderabadi & Lucknowi Biryani - Aromatic rice with tender meat', '123 Spice Street, Downtown', '555-0100', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', 4.8, 35, 2.99, true),
('Pizza Palace', 'Authentic Italian pizzas with fresh ingredients & wood-fired oven', '456 Main Street, Midtown', '555-0200', 'https://images.unsplash.com/photo-1513104890138-7c749659a591', 4.5, 30, 2.99, true),
('Royal Biryani Paradise', 'Premium biryani varieties - Chicken, Mutton, Veg & Seafood', '789 Royal Road, Eastside', '555-0300', 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0', 4.7, 40, 3.49, true),
('Pizzeria Italiano', 'New York style & Neapolitan pizzas with authentic Italian taste', '321 Pizza Lane, Westside', '555-0400', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', 4.6, 25, 1.99, true),
('Biryani Express', 'Quick & delicious biryani delivery - Dum cooked perfection', '654 Express Way, Uptown', '555-0500', 'https://images.unsplash.com/photo-1642821373181-696a54913e93', 4.4, 30, 2.49, true),
('Pizza Corner', 'Loaded pizzas with unlimited toppings & cheese burst options', '987 Corner Street, Downtown', '555-0600', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', 4.3, 28, 2.29, true);

-- Insert menu items for Biryani House (restaurant_id = 1)
INSERT INTO menu_items (name, description, price, image_url, category, is_vegetarian, is_available, restaurant_id) VALUES
('Hyderabadi Chicken Biryani', 'Aromatic basmati rice with tender chicken, saffron & spices', 12.99, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', 'Biryani', false, true, 1),
('Mutton Dum Biryani', 'Slow-cooked mutton with fragrant rice & caramelized onions', 15.99, 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0', 'Biryani', false, true, 1),
('Veg Biryani', 'Mixed vegetables with aromatic rice & Indian spices', 9.99, 'https://images.unsplash.com/photo-1642821373181-696a54913e93', 'Biryani', true, true, 1),
('Prawns Biryani', 'Succulent prawns cooked with basmati rice & coastal spices', 16.99, 'https://images.unsplash.com/photo-1589302168068-964664d93dc0', 'Biryani', false, true, 1),
('Egg Biryani', 'Boiled eggs layered with spiced rice & fried onions', 8.99, 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db', 'Biryani', true, true, 1),
('Raita', 'Cooling yogurt with cucumber & spices', 2.99, 'https://images.unsplash.com/photo-1601050690597-df0568f70950', 'Sides', true, true, 1);

-- Insert menu items for Pizza Palace (restaurant_id = 2)
INSERT INTO menu_items (name, description, price, image_url, category, is_vegetarian, is_available, restaurant_id) VALUES
('Margherita Pizza', 'Classic tomato sauce, fresh mozzarella, and basil', 12.99, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', 'Pizza', true, true, 2),
('Pepperoni Pizza', 'Loaded with pepperoni and mozzarella cheese', 14.99, 'https://images.unsplash.com/photo-1628840042765-356cda07504e', 'Pizza', false, true, 2),
('Veggie Supreme', 'Bell peppers, onions, mushrooms, olives, and tomatoes', 13.99, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', 'Pizza', true, true, 2),
('BBQ Chicken Pizza', 'BBQ sauce, grilled chicken, red onions, and cilantro', 15.99, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', 'Pizza', false, true, 2),
('Four Cheese Pizza', 'Mozzarella, parmesan, gorgonzola & ricotta cheese', 16.99, 'https://images.unsplash.com/photo-1513104890138-7c749659a591', 'Pizza', true, true, 2),
('Garlic Bread', 'Toasted bread with garlic butter and herbs', 5.99, 'https://images.unsplash.com/photo-1573140401552-388e3ead0b5e', 'Sides', true, true, 2);

-- Insert menu items for Royal Biryani Paradise (restaurant_id = 3)
INSERT INTO menu_items (name, description, price, image_url, category, is_vegetarian, is_available, restaurant_id) VALUES
('Royal Chicken Biryani', 'Premium chicken biryani with saffron & dry fruits', 14.99, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', 'Biryani', false, true, 3),
('Lucknowi Mutton Biryani', 'Awadhi style mutton biryani with aromatic spices', 17.99, 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0', 'Biryani', false, true, 3),
('Paneer Biryani', 'Cottage cheese cubes with fragrant basmati rice', 11.99, 'https://images.unsplash.com/photo-1642821373181-696a54913e93', 'Biryani', true, true, 3),
('Fish Biryani', 'Fresh fish fillets cooked with coastal spices & rice', 15.99, 'https://images.unsplash.com/photo-1589302168068-964664d93dc0', 'Biryani', false, true, 3),
('Chicken 65 Biryani', 'Spicy chicken 65 layered with biryani rice', 13.99, 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db', 'Biryani', false, true, 3),
('Mirchi Ka Salan', 'Spicy curry with green chilies - perfect biryani side', 3.99, 'https://images.unsplash.com/photo-1601050690597-df0568f70950', 'Sides', true, true, 3);

-- Insert menu items for Pizzeria Italiano (restaurant_id = 4)
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

INSERT INTO menu_items (name, description, price, image_url, category, is_vegetarian, is_available, restaurant_id) VALUES
('Neapolitan Pizza', 'Traditional Italian pizza with San Marzano tomatoes', 13.99, 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94', 'Pizza', true, true, 4),
('Meat Lovers Pizza', 'Pepperoni, sausage, bacon, and ham', 17.99, 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee', 'Pizza', false, true, 4),
('Hawaiian Pizza', 'Ham, pineapple, and mozzarella cheese', 14.99, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', 'Pizza', false, true, 4),
('Truffle Mushroom Pizza', 'Wild mushrooms with truffle oil & parmesan', 18.99, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', 'Pizza', true, true, 4),
('Buffalo Chicken Pizza', 'Spicy buffalo chicken with ranch drizzle', 16.99, 'https://images.unsplash.com/photo-1513104890138-7c749659a591', 'Pizza', false, true, 4),
('Bruschetta', 'Toasted bread with tomatoes, garlic & basil', 6.99, 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f', 'Appetizers', true, true, 4);

-- Insert menu items for Biryani Express (restaurant_id = 5)
INSERT INTO menu_items (name, description, price, image_url, category, is_vegetarian, is_available, restaurant_id) VALUES
('Express Chicken Biryani', 'Quick-cooked aromatic chicken biryani', 10.99, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8', 'Biryani', false, true, 5),
('Boneless Chicken Biryani', 'Tender boneless chicken with fragrant rice', 12.99, 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0', 'Biryani', false, true, 5),
('Keema Biryani', 'Minced meat cooked with aromatic spices & rice', 13.99, 'https://images.unsplash.com/photo-1642821373181-696a54913e93', 'Biryani', false, true, 5),
('Mushroom Biryani', 'Fresh mushrooms with basmati rice & spices', 9.99, 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db', 'Biryani', true, true, 5),
('Chicken Tikka Biryani', 'Grilled chicken tikka layered with biryani rice', 14.99, 'https://images.unsplash.com/photo-1589302168068-964664d93dc0', 'Biryani', false, true, 5),
('Onion Raita', 'Yogurt with onions, tomatoes & spices', 2.49, 'https://images.unsplash.com/photo-1601050690597-df0568f70950', 'Sides', true, true, 5);

-- Insert menu items for Pizza Corner (restaurant_id = 6)
INSERT INTO menu_items (name, description, price, image_url, category, is_vegetarian, is_available, restaurant_id) VALUES
('Cheese Burst Pizza', 'Extra cheese with molten cheese crust', 15.99, 'https://images.unsplash.com/photo-1513104890138-7c749659a591', 'Pizza', true, true, 6),
('Paneer Tikka Pizza', 'Indian fusion with paneer tikka topping', 13.99, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', 'Pizza', true, true, 6),
('Mexican Fiesta Pizza', 'Jalapeños, corn, beans & salsa', 14.99, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38', 'Pizza', true, true, 6),
('Chicken Tandoori Pizza', 'Tandoori chicken with Indian spices', 15.99, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f', 'Pizza', false, true, 6),
('Seafood Supreme Pizza', 'Shrimp, calamari & fish with garlic sauce', 18.99, 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94', 'Pizza', false, true, 6),
('Cheesy Garlic Bread', 'Garlic bread loaded with mozzarella', 6.99, 'https://images.unsplash.com/photo-1573140401552-388e3ead0b5e', 'Sides', true, true, 6);
