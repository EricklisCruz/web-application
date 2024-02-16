package com.redway.backendformapplication.controller;

import com.redway.backendformapplication.domain.user.User;
import com.redway.backendformapplication.dto.UserDTO;
import com.redway.backendformapplication.service.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Transactional
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid UserDTO userDTO, UriComponentsBuilder uriComponentsBuilder) {
        User user = userService.fromDTO(userDTO);
        user = userService.saveUser(user);
        URI uri = uriComponentsBuilder.path("/{id}").buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(uri).body(user);
    }

    @GetMapping
    public ResponseEntity<List<User>> findAllUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok().body(users);
    }
}
