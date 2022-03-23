from app import crud, models, schemas
from app.api import deps
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm.session import Session

router = APIRouter()


@router.get("/")
def read_reservations(
        db: Session = Depends(deps.get_db),
        skip: int = 0,
        limit: int = 100,
        current_user: models.User = Depends(deps.get_current_active_admin)
):
    """
    Retrieve reservations.
    """
    users = crud.reservation.get_multi(db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=schemas.ReservationResponse)
def create_reservation(
    res_in: schemas.ReservationCreate,
    db: Session = Depends(deps.get_db),
    current_user: models.User = Depends(deps.get_current_active_user)
):
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
        raise HTTPException(status_code=404, detail="Reservation not found")
    if not crud.user.is_admin(current_user) and (reservation.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    reservation = crud.reservation.remove(db=db, id=id)
    return reservation
