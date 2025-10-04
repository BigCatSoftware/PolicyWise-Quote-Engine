package com.policywise.quoteengine.backendapi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    /**
     * Creates a pre-configured WebClient bean for communicating with the Python risk
     * analyzer service. By defining this as a @Bean, Spring will manage its lifecycle,
     * and we can inject this WebClient into any other component.
     *
     * @return A configured WebClient instance.
     */
    @Bean
    public WebClient riskAnalyzerWebClient() {
        return WebClient.builder()
                // Set the base URL for the Python service. All requests made with this
                // client will be relative to this URL.
                .baseUrl("http://localhost:8000")
                // Set a default header. This tells the Python service that we will always
                // be sending data in JSON format.
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                // Build the WebClient instance.
                .build();
    }
}
