from typing import Any, List

from pydantic import SecretStr

from app import crud, models, schemas, utils
from app.api import deps
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm.session import Session

router = APIRouter()


@router.get("/", response_model=List[schemas.UserResponse])
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_admin),
) -> Any:
    """
    Retrieve users.
    """
    users = crud.user.get_multi(db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user_req: schemas.UserCreate, db: Session = Depends(deps.get_db)) -> Any:
    """
    Create new user without the need to be logged in.
    """
    user = crud.user.get_by_username(db, username=user_req.username)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user with this username already exists in the system",
        )
    user_in = schemas.UserCreate(**user_req.dict())
    user = crud.user.create(db, obj_in=user_in)
    return user


@router.put("/approve-user/{username}", response_model=schemas.UserResponseWithPassword)
def approve_user(username: str, db: Session = Depends(deps.get_db), current_user: schemas.User = Depends(deps.get_current_active_admin)):
    user = crud.user.get_by_username(db, username=username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this username does not exist in the system",
        )

    if user.is_active:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="The user has already been approved")
    user_in = schemas.User.from_orm(user)
    user_in.is_active = True
    user_in.password = SecretStr(utils.generate_random_password())
    user = crud.user.update(db, db_obj=user, obj_in=user_in)

    # DANGER
    print(f"\033[93mWarning: never send out plain passwords\033[0m")
    user.password = user_in.password.get_secret_value()

    return user
