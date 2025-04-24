# backend/app.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from crew_system import kickoff_process
from experts_crew_system import create_aws_architecture_recommendation
app = FastAPI()

class Requirements(BaseModel):
    cost_profile: str
    scalability: str
    ease_of_implementation: str
    integration_complexity: str
    required_expertise: str
    use_case: str
    security_tier: str
    performance: str
    availability: str
    compliance: list
    implementation_time: str

@app.post("/api/kickoff")
async def kickoff_requirements(req: Requirements):
    try:
        user_requirements = req.dict()
        result = create_aws_architecture_recommendation(user_requirements)
        return {"success": True, "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Optional: Add CORS middleware if frontend is hosted on another origin
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)