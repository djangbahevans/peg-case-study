import random
import string


def generate_random_password(length: int = 8) -> str:
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))


def generate_random_digits(length: int = 2) -> str:
    return ''.join(random.choices(string.digits, k=length))
