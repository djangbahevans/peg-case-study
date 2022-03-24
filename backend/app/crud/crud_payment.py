from typing import Any, Dict, List, Union

from app.crud.base import CRUDBase
from app.models import Payment
from app.schemas import PaymentCreate, PaymentUpdate, payment
from sqlalchemy.orm import Session


class CRUDPayment(CRUDBase[Payment, PaymentCreate, PaymentUpdate]):
    def get_multi_by_owner(self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100) -> List[Payment]:
        return db.query(self.model).filter(Payment.user_id == owner_id).offset(skip).limit(limit).all()
    
    def get_multi_by_owner_count(self, db: Session, *, owner_id: int) -> int:
        return db.query(self.model).filter(Payment.user_id == owner_id).count()

    def create(self, db: Session, *, obj_in: PaymentCreate) -> Payment:
        db_obj = Payment(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, *, db_obj: Payment, obj_in: Union[PaymentUpdate, Dict[str, Any]]) -> Payment:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)


payment = CRUDPayment(Payment)
