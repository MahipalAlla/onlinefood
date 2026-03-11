package com.foodapp.dto;

import jakarta.validation.constraints.NotNull;

public record PaymentRequest(
    @NotNull Long orderId,
    @NotNull Double amount,
    String paymentMethodId
) {}
