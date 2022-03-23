from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class FacilitiesEnum(str, Enum):
    SwimmingPool = "Swimming Pool"
    TennisCourt = "Tennis Court"
    Gym = "Gym"
    ConferenceRoom = "Conference Room"


class ReservationBase(BaseModel):
    facility: FacilitiesEnum
    time: datetime

    class Config:
        orm_mode = True


class ReservationCreate(ReservationBase):
    ...


class ReservationUpdate(ReservationBase):
    ...


class Reservation(ReservationBase):
    id: Optional[int]
    user_id: Optional[int]
    created_at: Optional[datetime]

class ReservationResponse(ReservationBase):
    id: int
    user_id: int
    created_at: datetime
