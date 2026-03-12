package com.foodapp.config;

import com.foodapp.model.User;
import com.foodapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Create default test user if not exists
        if (userRepository.findByEmail("test@foodhub.com").isEmpty()) {
            User testUser = new User();
            testUser.setEmail("test@foodhub.com");
            testUser.setPassword(passwordEncoder.encode("password123"));
            testUser.setFullName("Test User");
            testUser.setPhone("1234567890");
            testUser.setAddress("123 Main Street, City, State 12345");
            testUser.setRole(User.Role.CUSTOMER);
            
            userRepository.save(testUser);
            System.out.println("✅ Default test user created!");
            System.out.println("📧 Email: test@foodhub.com");
            System.out.println("🔑 Password: password123");
        }
    }
}
