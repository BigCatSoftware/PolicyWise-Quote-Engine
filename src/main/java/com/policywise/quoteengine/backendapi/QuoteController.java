package com.policywise.quoteengine.backendapi;

import com.policywise.quoteengine.backendapi.dto.DetailedQuoteRequest;
import com.policywise.quoteengine.backendapi.dto.QuoteRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class QuoteController {

    private final WebClient webClient;

    @Value("${risk.analyzer.url}")
    private String riskAnalyzerUrl;

    public QuoteController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    @PostMapping("/quotes")
    public Map<String, String> submitQuote(@RequestBody QuoteRequest quoteRequest) {
        System.out.println("Received quote request: " + quoteRequest);
        return Map.of("message", "Quote request received successfully!");
    }

    @PostMapping("/quotes/detailed")
    public Mono<Map<String, Object>> submitDetailedQuote(@RequestBody DetailedQuoteRequest detailedQuoteRequest) {
        System.out.println("Received detailed quote request: " + detailedQuoteRequest);
        System.out.println("Forwarding request to risk analyzer at: " + riskAnalyzerUrl);

        return webClient.post()
                .uri(riskAnalyzerUrl + "/calculate-quote")
                .bodyValue(detailedQuoteRequest)
                .retrieve()
                .bodyToMono(Map.class)
                .map(responseFromAnalyzer -> {
                    System.out.println("Received response from risk analyzer: " + responseFromAnalyzer);
                    // The responseFromAnalyzer is now a map containing the full breakdown.
                    // e.g., {base_premium: 100, state_adjustment: 50, ...}
                    return Map.of(
                        "message", "Quote calculated successfully!",
                        "quoteDetails", responseFromAnalyzer // Pass the whole breakdown object
                    );
                });
    }
}
