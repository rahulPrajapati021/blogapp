package com.pranton.blog.services.impls;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pranton.blog.entity.User;
import com.pranton.blog.repositories.UserRepository;
import com.pranton.blog.services.UserService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    @Override
    public User getUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not found with id " + id));
    }
    
}
