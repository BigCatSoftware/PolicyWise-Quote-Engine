from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(
    title="PolicyWise Risk Analyzer",
    description="An API to calculate an insurance quote based on vehicle and location data.",
    version="2.1.0" # Version bump
)

class DetailedQuoteRequest(BaseModel):
    state: str
    vehicle_make: str = Field(..., alias='vehicleMake')
    vehicle_model: str = Field(..., alias='vehicleModel')
    vehicle_color: str = Field(..., alias='vehicleColor')

class QuoteBreakdownResponse(BaseModel):
    base_premium: float
    state_adjustment: float
    make_adjustment: float
    model_surcharge: float
    final_premium: float

HIGH_RISK_STATES = {"California": 1.5, "New York": 1.4, "Florida": 1.3}
MAKE_MULTIPLIERS = {"BMW": 1.8, "Ford": 1.1, "Chevrolet": 1.1, "Toyota": 1.0, "Honda": 1.0, "Nissan": 1.1}
SPORT_MODEL_SURCHARGE_VAL = 25.0

@app.post("/calculate-quote", response_model=QuoteBreakdownResponse)
def calculate_quote(request: DetailedQuoteRequest):
    """
    Calculates a monthly insurance premium and its breakdown.
    """
    base_premium = 100.0

    # Calculate adjustments
    state_multiplier = HIGH_RISK_STATES.get(request.state, 1.0)
    state_adjustment = base_premium * (state_multiplier - 1.0)

    make_multiplier = MAKE_MULTIPLIERS.get(request.vehicle_make, 1.2)
    make_adjustment = (base_premium + state_adjustment) * (make_multiplier - 1.0)

    model_surcharge = 0.0
    if request.vehicle_model in ["Mustang", "Camaro", "M3"]:
        model_surcharge = SPORT_MODEL_SURCHARGE_VAL

    # Calculate final premium
    final_premium = base_premium + state_adjustment + make_adjustment + model_surcharge

    return {
        "base_premium": round(base_premium, 2),
        "state_adjustment": round(state_adjustment, 2),
        "make_adjustment": round(make_adjustment, 2),
        "model_surcharge": round(model_surcharge, 2),
        "final_premium": round(final_premium, 2)
    }
