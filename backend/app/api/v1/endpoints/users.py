from typing import Any, List

from pydantic import SecretStr

from app import crud, models, schemas, utils
from app.api import deps
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm.session import Session

router = APIRouter()


@router.get("/", response_model=List[schemas.UserResponse])
def read_users(
    response: Response,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_admin),
) -> Any:
    """
    Retrieve users.
    """
    users = crud.user.get_multi(db, skip=skip, limit=limit)
    count = crud.user.get_multi_total_count(db)
    response.headers["x-total-count"] = f"{count}"
    return users


@router.get("/me", response_model=schemas.UserResponse)
def get_current_user(
    db: Session = Depends(deps.get_db),
    current_user=Depends(deps.get_current_active_user)
):
    """
    Get current user
    """
    return current_user


@router.get("/{id}", response_model=schemas.UserResponse)
def get_single_user(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    """
    Get single user
    """
    if current_user.is_admin:
        return crud.user.get(db, id=id)

    if id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="The user does not have enough privileges"
        )

    return current_user


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


@router.put("/approve/{username}", response_model=schemas.UserPasswordResponse)
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

    return {"password": user.password}


@router.delete("/{id}")
def delete_user(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user: schemas.User = Depends(deps.get_current_active_user)
):
    if current_user.is_admin:
        crud.user.remove(db, id=id)
    elif id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="The user does not have enough privileges"
        )
    else:
        crud.user.remove(db, id=id)

    return Response(status_code=status.HTTP_204_NO_CONTENT)
