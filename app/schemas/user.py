from datetime import date, datetime
from typing import List

from app.utils import generate_random_digits, generate_random_password
from pydantic import BaseModel, Field, SecretStr, validator


class UserBase(BaseModel):
    first_name: str
    last_name: str
    dob: date
    address: str
    hobbies: List[str]
    national_id: str

    @validator("first_name", "last_name", "address", "national_id", pre=True)
    def required(cls, v, values):
        if not isinstance(v, str):
            raise TypeError("must be a string")
        if len(v) < 1:
            raise ValueError("must be provided")
        return v

    @validator("dob")
    def validate_dob(cls, v, values):
        if v >= date.today():
            raise ValueError("must be in the past")
        return v

    @validator("hobbies", pre=True)
    def validate_hobbies(cls, v, values):
        if not isinstance(v, list):
            raise TypeError
        return v


class UserCreate(UserBase):
    ...


class User(UserBase):
    id: int
    password: SecretStr = Field(
        default_factory=lambda: SecretStr(generate_random_password()))
    username: str = ""
    createdAt: datetime

    @validator("username", always=True)
    def set_username(cls, v, values):
        try:
            last_name = values.get("last_name")
            username = last_name + generate_random_digits()
            return username
        except:
            return v

    class Config():
        orm_mode = True
