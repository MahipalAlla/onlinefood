package com.foodapp.controller;

import com.foodapp.model.MenuItem;
import com.foodapp.model.Restaurant;
import com.foodapp.repository.MenuItemRepository;
import com.foodapp.repository.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@RequiredArgsConstructor
public class RestaurantController {
    
    private final RestaurantRepository restaurantRepository;
    private final MenuItemRepository menuItemRepository;
    
    @GetMapping
    public ResponseEntity<List<Restaurant>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        return restaurantRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}/menu")
    public ResponseEntity<List<MenuItem>> getRestaurantMenu(@PathVariable Long id) {
        return ResponseEntity.ok(menuItemRepository.findByRestaurantIdAndIsAvailableTrue(id));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurants(@RequestParam String query) {
        return ResponseEntity.ok(restaurantRepository.findByNameContainingIgnoreCase(query));
    }
}
