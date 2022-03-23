from datetime import date, datetime
from typing import List, Optional

from app.utils import generate_random_digits, generate_random_password
from pydantic import BaseModel, Field, SecretStr, validator


class UserBase(BaseModel):
    first_name: str
    last_name: str
    dob: date
    address: str
    hobbies: List[str]
    national_id: str

    class Config:
        orm_mode = True

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


class UserUpdate(UserBase):
    password: SecretStr
    is_admin: bool = False
    is_active: bool
    amount_paid: int

class UserCreate(UserBase):
    username: str = ""

    @validator("username", always=True)
    def set_username(cls, v, values):
        if v:
            return v
        try:
            last_name = values.get("last_name").lower()
            username = last_name + generate_random_digits()
            return username
        except:
            return v


class User(UserBase):
    id: int
    password: Optional[SecretStr] = None
    username: str = ""
    is_admin: bool = False
    is_active: bool = False
    amount_paid: int = 0
    created_at: datetime

    @validator("username", always=True)
    def set_username(cls, v, values):
        if v:
            return v
        try:
            last_name = values.get("last_name").lower()
            username = last_name + generate_random_digits()
            return username
        except:
            return v


class UserResponse(UserBase):
    id: int
    username: str
    is_admin: bool
    is_active: bool
    amount_paid: int
    created_at: datetime
