FROM python:3.7.7-slim

WORKDIR /app

COPY requirements.txt /app
# RUN pip3 install -vvv --no-cache-dir -r requirements.txt

RUN chmod 777 /app/
RUN mkdir -p /app/sessions/

COPY ./rtopic.py /app

EXPOSE 8000

CMD ["python", "rtopic.py"]