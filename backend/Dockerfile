FROM python:3.10.3-slim-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && apt-get -y install libpq-dev gcc

RUN pip install pipenv

RUN pip install -r requirements.txt

ENV DATABASE_HOSTNAME postgres
ENV DATABASE_PORT 5432
ENV DATABASE_PASSWORD password
ENV DATABASE_NAME casestudy
ENV DATABASE_USERNAME postgres
ENV SECRET_KEY u8x/A?D(G+KbPeShVkYp3s6v9y$B&E)H
ENV FIRST_SUPERUSER admin
ENV FIRST_SUPERUSER_PASSWORD admin
ENV MEMBERSHIP_FEES 10000
ENV ACCESS_TOKEN_EXPIRE_MINUTES 10080

COPY . .

EXPOSE 80

CMD [ "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80" ]
