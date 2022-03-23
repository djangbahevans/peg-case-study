from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.api import api_router
from app.core.config import settings
from app.initial_data import main

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create initial data
main()

app.include_router(api_router, prefix=settings.API_V1_STRING)


@app.get("/")
def root():
    return "Hello and welcome to this api"
