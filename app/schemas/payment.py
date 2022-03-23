from datetime import datetime
from pydantic import BaseModel


class PaymentBase(BaseModel):
    amount: int

    class Config:
        orm_mode = True

class PaymentCreate(PaymentBase):
    ...

class PaymentResponse(PaymentBase):
    id: int
    user_id: int
    created_at: datetime
