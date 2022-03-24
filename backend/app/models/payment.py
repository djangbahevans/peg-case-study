from app.db.base_class import Base
from sqlalchemy import TIMESTAMP, Column, ForeignKey, Integer, text
from sqlalchemy.orm import relationship


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, nullable=False)
    amount = Column(Integer, nullable=False, default=0)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text("now()"))

    user = relationship("User")
