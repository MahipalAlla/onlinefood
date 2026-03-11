package com.foodapp.repository;

import com.foodapp.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByIsOpenTrue();
    List<Restaurant> findByNameContainingIgnoreCase(String name);
}
