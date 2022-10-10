FROM python:3.7.7-slim

WORKDIR /app

COPY requirements.txt /app
RUN pip3 install -vvv --no-cache-dir -r requirements.txt

COPY ./mock.py /app

EXPOSE 8000

CMD ["python", "mock.py"]