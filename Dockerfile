# syntax=docker/dockerfile:1
FROM python:3.9-slim-buster

# run this before copying requirements for cache efficiency
#RUN pip3 install --upgrade pip3

# Installing and build python module
RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip3 install psycopg2

WORKDIR /app

COPY requirements.txt .

RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_APP=app.py
ENV FLASK_ENV=development
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000


#CMD ["flask", "run"]
CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]
