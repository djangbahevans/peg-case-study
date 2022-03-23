from typing import Any, Dict, List, Union

from app.crud.base import CRUDBase
from app.models import Reservation
from app.schemas import ReservationCreate, ReservationUpdate
from sqlalchemy.orm import Session


class CRUDReservation(CRUDBase[Reservation, ReservationCreate, ReservationUpdate]):
    def get_multi_by_owner(self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100) -> List[Reservation]:
        return db.query(self.model).filter(Reservation.user_id == owner_id).offset(skip).limit(limit).all()

    def create(self, db: Session, *, obj_in: ReservationCreate) -> Reservation:
        db_obj = Reservation(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, *, db_obj: Reservation, obj_in: Union[ReservationUpdate, Dict[str, Any]]) -> Reservation:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)


reservation = CRUDReservation(Reservation)
