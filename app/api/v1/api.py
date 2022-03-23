from fastapi import APIRouter
from app.api.v1.endpoints import users
from app.api.v1.endpoints import login

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(login.router, tags=["login"])
