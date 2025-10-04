from fastapi import FastAPI
from pydantic import BaseModel, Field

# Create an instance of teh FastAPI application
app = FastAPI(
    title = "PolicyWise Risk Analyzer",
    description = "A simple API to calculate an insurance risk score.",
    version = "1.0.0"
)

# Define the data structure expected in a request.
# Using Pydantic's BaseModel gives us automatic data validation.
# If a request comes in with the wrong sdata types, FastAPI will
# automatically send back a helpful error message.
class QuoteRequest(BaseModel):
    age: int = Field(..., description="The age of the driver.", ge=16)
    vehicle_year: int = Field(..., description="The manufacturing year of the vehicle.", gt=1980)
    driving_record_points: int = Field(..., description="Number of points on the driving record.", ge=0)

# Define the data structure for our API's response.
class RiskResponse(BaseModel):
    risk_score: int

# Create the API endpoint using a decorator.
# @app.post tells FastAPI to create a POST endpoint at the URL "/analyze-risk".
# It will automatically handle converting the incoming JSON into our QuoteRequest object.
@app.post("/analyze-risk", response_model=RiskResponse)
def analyze_risk(request: QuoteRequest):
    """
    Analyzes driver and vehicle data to produce a simple risk score.
    - Younger drivers have a higher base score.
    - Older cars add to the risk.
    - Driving record points significantly increase the risk.
    """
    # Implement our simple "risk model" logic.
    risk_score = 100  # Start with a base score

    if request.age < 25:
        risk_score += 50

    if request.vehicle_year < 2010:
        risk_score += 30

    # Add 20 points for each point on the driving record
    risk_score += (request.driving_record_points * 20)

    # Return the result. FastAPI will automatically convert this
    # dictionary into a JSON response that matches our RiskResponse model.
    return {"risk_score": risk_score}