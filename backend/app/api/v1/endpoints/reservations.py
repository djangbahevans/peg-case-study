from app import crud, models, schemas
from app.api import deps
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm.session import Session

from app.utils import can_access_facility

router = APIRouter()


@router.get("/")
def read_reservations(
        db: Session = Depends(deps.get_db),
        skip: int = 0,
        limit: int = 100,
        current_user: models.User = Depends(deps.get_current_active_user)
):
    """
    Retrieve reservations.
    """
    if current_user.is_admin:
        users = crud.reservation.get_multi(db, skip=skip, limit=limit)
    else:
        users = crud.reservation.get_multi_by_owner(
            db, owner_id=current_user.id, skip=skip, limit=limit)
    return users


@router.post("/", response_model=schemas.ReservationResponse, status_code=status.HTTP_201_CREATED)
def create_reservation(
    res_in: schemas.ReservationCreate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
    if not can_access_facility(current_user.amount_paid, res_in.facility):
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED, detail="Payment required to access facility")
    res = schemas.Reservation(user_id=current_user.id, **res_in.dict())
    reservation = crud.reservation.create(db, obj_in=res)
    return reservation


@router.delete("/{id}")
def delete_reservation(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
):
    """
    Delete a reservation
    """
    reservation = crud.reservation.get(db=db, id=id)
    if not reservation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Reservation not found")
    if not crud.user.is_admin(current_user) and (reservation.user_id != current_user.id):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Not enough permissions")
    reservation = crud.reservation.remove(db=db, id=id)
    return reservation
