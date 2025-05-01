from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from experts_crew_system import create_aws_architecture_recommendation

app = FastAPI(title="AWS Architecture Recommendation API")

class Requirements(BaseModel):
    use_case: str = Field(..., description="Description of the use case, e.g. 'e-commerce platform with 1M monthly users'")
    performance: str = Field(..., description="Performance requirements (low/medium/high)")
    availability: str = Field(..., description="Required availability percentage, e.g. '99.99%'")
    security_tier: str = Field(..., description="Security requirements (low/medium/high)")
    compliance: List[str] = Field(..., description="List of compliance requirements, e.g. ['PCI-DSS', 'HIPAA']")
    cost_profile: str = Field(..., description="Cost optimization profile (budget/balanced/performance)")
    implementation_time: str = Field(..., description="Expected implementation timeframe")
    required_expertise: str = Field(..., description="Required AWS expertise level (beginner/intermediate/advanced)")
    scalability: str = Field(..., description="Scalability requirements (low/medium/high)")
    ease_of_implementation: str = Field(..., description="Ease of implementation (easy/medium/complex)")
    integration_complexity: str = Field(default="Moderate", description="Integration complexity (Low/Moderate/High)")

class ArchitectureResponse(BaseModel):
    success: bool = Field(True, description="Indicates if the request was successful")
    result: Dict[str, Any] = Field(..., description="Task outputs from the architecture recommendation process")

@app.post("/api/kickoff", response_model=ArchitectureResponse)
async def kickoff_requirements(req: Requirements):
    """
    Create an AWS architecture recommendation based on provided requirements.
    
    Args:
        req: The requirements for the architecture
    
    Returns:
        Complete results from the CrewAI process including architecture recommendation and all task outputs
    """
    try:
        user_requirements = req.dict()
        result = create_aws_architecture_recommendation(user_requirements)
        
        # Return the complete result as is - keeping all task outputs
        return {
            "success": True,
            "result": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Add CORS middleware for frontend access
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)