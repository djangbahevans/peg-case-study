from app.db.base_class import Base
from sqlalchemy import ARRAY, TIMESTAMP, Column, Date, Integer, String, text, Boolean, Float


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    dob = Column(Date, nullable=False)
    address = Column(String, nullable=False)
    hobbies = Column(ARRAY(String), server_default="{}")
    national_id = Column(String, nullable=False)
    password = Column(String, nullable=True)
    username = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)
    is_active = Column(Boolean, default=False)
    amount_paid = Column(Float, default=0.0)
    created_at = Column(TIMESTAMP(timezone=True),
                       nullable=False, server_default=text("now()"))
