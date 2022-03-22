from datetime import date, datetime, timedelta
from typing import List

import pytest
from app.schemas.user import User, UserBase

first_name: str = "First"
last_name: str = "Last"
dob: date = "2002-02-05"
address: str = "First street, Kumasi"
hobbies: List[str] = []
national_id: str = "0xxxx2"


def test_first_name_not_provided():
    with pytest.raises(ValueError):
        user = UserBase(first_name="", last_name=last_name, dob=dob, address=address,
                        hobbies=hobbies, national_id=national_id)


def test_last_name_not_provided():
    with pytest.raises(ValueError):
        user = UserBase(first_name=first_name, last_name="", dob=dob, address=address,
                        hobbies=hobbies, national_id=national_id)


def test_address_not_provided():
    with pytest.raises(ValueError):
        user = UserBase(first_name=first_name, last_name=last_name, dob=dob, address="",
                        hobbies=hobbies, national_id=national_id)


def test_national_id_not_provided():
    with pytest.raises(ValueError):
        user = UserBase(first_name=first_name, last_name=last_name, dob=dob, address=address,
                        hobbies=hobbies, national_id="")


def test_future_date():
    with pytest.raises(ValueError):
        user = UserBase(first_name=first_name, last_name=last_name, dob=date.today()+timedelta(days=1), address=address,
                        hobbies=hobbies, national_id="")


def test_all_details_provided():
    user = UserBase(first_name=first_name, last_name=last_name, dob=dob, address=address,
                    hobbies=hobbies, national_id=national_id)


def test_user_password_generation():
    user = User(id=1, first_name=first_name, last_name=last_name, dob=dob, address=address,
                hobbies=hobbies, national_id=national_id, createdAt=datetime.now())

    assert len(user.password.get_secret_value()) >= 8
    assert len(user.username) == (len(user.last_name) + 2)
    assert user.last_name in user.username
