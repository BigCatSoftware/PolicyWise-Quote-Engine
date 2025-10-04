package com.policywise.quoteengine.backendapi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * A simple controller to verify the frontend-backend connection.
 */
@RestController
@RequestMapping("/api/v1") // All endpoints in this controller will start with /api/v1
public class GreetingController {

    @GetMapping("/hello")
    public Map<String, String> sayHello() {
        // Spring boot automatically converts this Java Map to JSON
        return Map.of("message", "Hello from the Spring Boot Backend!");
    }
}
