FROM python:3.7.7-slim

WORKDIR /app

COPY requirements.txt /app
RUN pip3 install -vvv --no-cache-dir -r requirements.txt

COPY ./javascript/ /app/javascript/

RUN chmod 777 /app/
RUN mkdir -p /app/sessions/

COPY ./front.py /app

EXPOSE 5001

CMD ["python", "front.py"]