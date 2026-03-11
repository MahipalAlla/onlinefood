package com.foodapp.service;

import com.foodapp.dto.OrderRequest;
import com.foodapp.model.*;
import com.foodapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    
    @Transactional
    public Order createOrder(OrderRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Restaurant restaurant = restaurantRepository.findById(request.restaurantId())
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
        
        Order order = new Order();
        order.setUser(user);
        order.setRestaurant(restaurant);
        order.setDeliveryAddress(request.deliveryAddress());
        order.setDeliveryFee(restaurant.getDeliveryFee());
        
        double totalAmount = 0.0;
        
        for (var itemRequest : request.items()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.menuItemId())
                    .orElseThrow(() -> new RuntimeException("Menu item not found"));
            
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemRequest.quantity());
            orderItem.setPrice(menuItem.getPrice());
            
            order.getOrderItems().add(orderItem);
            totalAmount += menuItem.getPrice() * itemRequest.quantity();
        }
        
        order.setTotalAmount(totalAmount + restaurant.getDeliveryFee());
        
        return orderRepository.save(order);
    }
    
    public List<Order> getUserOrders(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }
    
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }
    
    public Order updateOrderStatus(Long orderId, Order.OrderStatus status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        order.setUpdatedAt(LocalDateTime.now());
        return orderRepository.save(order);
    }
}
