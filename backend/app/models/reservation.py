from app.db.base_class import Base
from sqlalchemy import (TIMESTAMP, Column, DateTime, Enum, ForeignKey, Integer,
                        text)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

FacilitiesEnum = Enum("Swimming Pool", "Gym", "Tennis Court",
                      "Conference Room", name="facilities_enum")


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, nullable=False)
    facility = Column(FacilitiesEnum, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    time = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text("now()"))

    user = relationship("User")
