package com.policywise.quoteengine.backendapi.dto;

public class DetailedQuoteRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String state;
    private String vehicleMake;
    private String vehicleModel;
    private String vehicleColor;

    // Getters
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getState() { return state; }
    public String getVehicleMake() { return vehicleMake; }
    public String getVehicleModel() { return vehicleModel; }
    public String getVehicleColor() { return vehicleColor; }

    // Setters
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public void setEmail(String email) { this.email = email; }
    public void setState(String state) { this.state = state; }
    public void setVehicleMake(String vehicleMake) { this.vehicleMake = vehicleMake; }
    public void setVehicleModel(String vehicleModel) { this.vehicleModel = vehicleModel; }
    public void setVehicleColor(String vehicleColor) { this.vehicleColor = vehicleColor; }

    @Override
    public String toString() {
        return "DetailedQuoteRequest{" +
                "firstName='" + firstName + "'" + 
                ", lastName='" + lastName + "'" + 
                ", email='" + email + "'" + 
                ", state='" + state + "'" + 
                ", vehicleMake='" + vehicleMake + "'" + 
                ", vehicleModel='" + vehicleModel + "'" + 
                ", vehicleColor='" + vehicleColor + "'" + 
                '}';
    }
}
