package com.foodapp.service;

import com.foodapp.dto.AuthResponse;
import com.foodapp.dto.LoginRequest;
import com.foodapp.dto.RegisterRequest;
import com.foodapp.model.User;
import com.foodapp.repository.UserRepository;
import com.foodapp.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setFullName(request.fullName());
        user.setPhone(request.phone());
        user.setAddress(request.address());
        
        userRepository.save(user);
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        String token = jwtUtil.generateToken(userDetails);
        
        return new AuthResponse(token, user.getEmail(), user.getFullName(), user.getRole().name());
    }
    
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.email());
        String token = jwtUtil.generateToken(userDetails);
        
        return new AuthResponse(token, user.getEmail(), user.getFullName(), user.getRole().name());
    }
}
