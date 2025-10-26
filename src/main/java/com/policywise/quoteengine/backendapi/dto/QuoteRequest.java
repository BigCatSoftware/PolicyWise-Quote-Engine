package com.policywise.quoteengine.backendapi.dto;

public class QuoteRequest {
    private String firstName;
    private String lastName;
    private String email;

    // Getters
    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    // Setters
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "QuoteRequest{" +
                "firstName='" + firstName + "'" +
                ", lastName='" + lastName + "'" +
                ", email='" + email + "'" +
                '}';
    }
}
