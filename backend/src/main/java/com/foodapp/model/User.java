package com.foodapp.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String fullName;
    
    private String phone;
    private String address;
    
    @Enumerated(EnumType.STRING)
    private Role role = Role.CUSTOMER;
    
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Order> orders = new HashSet<>();
    
    public enum Role {
        CUSTOMER, RESTAURANT_OWNER, ADMIN
    }
}
