from datetime import datetime
from enum import Enum

from pydantic import BaseModel


class FacilitiesEnum(Enum):
    SwimmingPool = "Swimming Pool"
    TennisCourt = "Tennis Court"
    Gym = "Gym"
    ConferenceRoom = "Conference Room"


class ReservationBase(BaseModel):
    user_id: int
    facility: FacilitiesEnum
    time: datetime


class ReservationCreate(ReservationBase):
    ...


class ReservationResponse(ReservationBase):
    id: int
    created_at: datetime
