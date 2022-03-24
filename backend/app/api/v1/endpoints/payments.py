from typing import List

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm.session import Session

router = APIRouter()


@router.get("/", response_model=List[schemas.PaymentResponse])
def read_payment(
    response: Response,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
):
    if current_user.is_admin:
        payments = crud.payment.get_multi(db, skip=skip, limit=limit)
        count = crud.payment.get_multi_total_count(db)
    else:
        payments = crud.payment.get_multi_by_owner(
            db, owner_id=current_user.id, skip=skip, limit=limit)
        count = crud.payment.get_multi_total_count(db)
    response.headers["x-total-count"] = f"{count}"
    return payments


@router.post("/", response_model=schemas.PaymentResponse)
def create_payment(
    *,
    amount: int,
    username: str,
    db: Session = Depends(deps.get_db),
    admin: models.User = Depends(deps.get_current_active_admin)
):
    user = crud.user.get_by_username(db, username=username)
    if (user.amount_paid + amount) > settings.MEMBERSHIP_FEES:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE,
                            detail=f"Cannot pay total more than {settings.MEMBERSHIP_FEES}. Current total is {user.amount_paid}")
    obj_in = schemas.PaymentCreate(
        amount=amount, user_id=user.id)
    payment = crud.payment.create(db, obj_in=obj_in)
    crud.user.update(db, db_obj=user, obj_in={
                     "amount_paid": user.amount_paid + amount})

    return payment
