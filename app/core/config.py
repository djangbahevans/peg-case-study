from pydantic import BaseSettings, validator


class AppSettings(BaseSettings):
    DATABASE_HOSTNAME: str
    DATABASE_PORT: str
    DATABASE_PASSWORD: str
    DATABASE_NAME: str
    DATABASE_USERNAME: str
    DATABASE_URI: str

    @validator("DATABASE_URI", pre=True)
    def parse_uri(cls, v, values):
        try:
            database_hostname = values.get("DATABASE_HOSTNAME")
            database_port = values.get("DATABASE_PORT")
            database_password = values.get("DATABASE_PASSWORD")
            database_name = values.get("DATABASE_NAME")
            database_username = values.get("DATABASE_USERNAME")
            return f"postgresql://{database_username}:{database_password}@{database_hostname}:{database_port}/{database_name}"
        except:
            return v

    class Config:
        env_file = ".env"


settings = AppSettings()
