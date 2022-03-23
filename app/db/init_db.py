from datetime import date, timedelta
from app import crud, schemas
from app.core.config import settings
from sqlalchemy.orm.session import Session


def init_db(db: Session):
    user = crud.user.get_by_username(db, username=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schemas.UserCreate(
            username=settings.FIRST_SUPERUSER,
            first_name=settings.FIRST_SUPERUSER,
            last_name=settings.FIRST_SUPERUSER,
            national_id=settings.FIRST_SUPERUSER,
            hobbies=[],
            address=settings.FIRST_SUPERUSER,
            dob=date.today() - timedelta(days=1),
            is_admin=True,
        )
        user = crud.user.create(db, obj_in=user_in)  # noqa: F841
        user_dict = user.__dict__
        user_dict["password"] = settings.FIRST_SUPERUSER_PASSWORD
        user_dict["is_admin"] = True
        user_dict["is_active"] = True
        user_update = schemas.UserUpdate(**user_dict)
        crud.user.update(db, db_obj=user, obj_in=user_update)
