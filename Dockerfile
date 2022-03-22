FROM python:alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .

RUN pip install pipenv

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD [ "alembic", "upgrade", "head", "&&", "uvicorn", "app.main:app", "--port", "8000" ]
