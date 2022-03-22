from app.db.base import Base
from sqlalchemy import ARRAY, TIMESTAMP, Column, Date, Integer, String, text


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    dob = Column(Date, nullable=False)
    address = Column(String, nullable=False)
    hobbies = Column(ARRAY(String), server_default="{}")
    national_id = Column(String, nullable=False)
    password = Column(String, nullable=False)
    username = Column(String, nullable=False)
    createdAt = Column(TIMESTAMP(timezone=True),
                       nullable=False, server_default=text("now()"))
