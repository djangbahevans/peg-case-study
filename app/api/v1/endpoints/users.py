from fastapi import APIRouter


router = APIRouter()

@router.post("/")
def create_user():
    pass
