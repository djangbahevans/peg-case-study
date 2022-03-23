from app.core.config import settings
import random
import string
from app.schemas.reservation import FacilitiesEnum


def generate_random_password(length: int = 8) -> str:
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))


def generate_random_digits(length: int = 2) -> str:
    return ''.join(random.choices(string.digits, k=length))


def can_access_facility(amount_paid: int, facility: FacilitiesEnum) -> bool:
    if amount_paid >= settings.MEMBERSHIP_FEES:
        return True
    elif amount_paid > (settings.MEMBERSHIP_FEES/2):
        return facility == FacilitiesEnum.SwimmingPool
    return False
