FROM python:3.7.7-slim

WORKDIR /app

COPY ./mock.py /app

EXPOSE 8000

CMD ["python", "mock.py"]