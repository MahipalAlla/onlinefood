package com.foodapp.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record OrderRequest(
    @NotNull Long restaurantId,
    @NotEmpty List<OrderItemRequest> items,
    @NotNull String deliveryAddress,
    String specialInstructions
) {}
