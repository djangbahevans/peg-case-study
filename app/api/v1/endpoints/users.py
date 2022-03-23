from typing import Any

from app import crud, schemas
from app.api import deps
from app.schemas.user import UserCreate
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm.session import Session

router = APIRouter()


@router.post("/sign-up", response_model=schemas.UserResponse)
def create_user(user_req: UserCreate, db: Session = Depends(deps.get_db)) -> Any:
    """
    Create new user without the need to be logged in.
    """
    user = crud.user.get_by_username(db, username=user_req.username)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system",
        )
    user_in = schemas.UserCreate(**user_req.dict())
    user = crud.user.create(db, obj_in=user_in)
    return user
