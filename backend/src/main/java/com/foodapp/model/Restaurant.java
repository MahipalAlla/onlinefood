package com.foodapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "restaurants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private String description;
    private String address;
    private String phone;
    private String imageUrl;
    private Double rating = 0.0;
    private Integer deliveryTime; // in minutes
    private Double deliveryFee;
    private Boolean isOpen = true;
    
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<MenuItem> menuItems = new ArrayList<>();
    
    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;
}
