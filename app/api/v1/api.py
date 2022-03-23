from fastapi import APIRouter
from app.api.v1.endpoints import users
from app.api.v1.endpoints import login
from app.api.v1.endpoints import reservations
from app.api.v1.endpoints import payments

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(login.router, tags=["auth"])
api_router.include_router(reservations.router, prefix="/reservations", tags=["reservations"])
api_router.include_router(payments.router, prefix="/payments", tags=["payments"])
