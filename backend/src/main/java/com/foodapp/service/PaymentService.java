package com.foodapp.service;

import com.foodapp.dto.PaymentRequest;
import com.foodapp.model.Order;
import com.foodapp.repository.OrderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {
    
    @Value("${stripe.api.key}")
    private String stripeApiKey;
    
    private final OrderRepository orderRepository;
    
    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }
    
    public Map<String, String> createPaymentIntent(PaymentRequest request) throws StripeException {
        Order order = orderRepository.findById(request.orderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (request.amount() * 100)) // Convert to cents
                .setCurrency("usd")
                .putMetadata("orderId", order.getId().toString())
                .build();
        
        PaymentIntent paymentIntent = PaymentIntent.create(params);
        
        Map<String, String> response = new HashMap<>();
        response.put("clientSecret", paymentIntent.getClientSecret());
        response.put("paymentIntentId", paymentIntent.getId());
        
        return response;
    }
    
    public void confirmPayment(Long orderId, String paymentId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        order.setPaymentId(paymentId);
        order.setPaymentStatus(Order.PaymentStatus.COMPLETED);
        order.setStatus(Order.OrderStatus.CONFIRMED);
        
        orderRepository.save(order);
    }
}
