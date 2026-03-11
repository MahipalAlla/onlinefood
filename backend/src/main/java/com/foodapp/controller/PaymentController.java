package com.foodapp.controller;

import com.foodapp.dto.PaymentRequest;
import com.foodapp.service.PaymentService;
import com.stripe.exception.StripeException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    
    private final PaymentService paymentService;
    
    @PostMapping("/create-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@Valid @RequestBody PaymentRequest request) {
        try {
            return ResponseEntity.ok(paymentService.createPaymentIntent(request));
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/confirm")
    public ResponseEntity<Map<String, String>> confirmPayment(@RequestParam Long orderId, 
                                                              @RequestParam String paymentId) {
        paymentService.confirmPayment(orderId, paymentId);
        return ResponseEntity.ok(Map.of("message", "Payment confirmed successfully"));
    }
}
