from app.db.session import SessionLocal
from sqlalchemy.orm.session import Session


def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    except:
        db.close()
